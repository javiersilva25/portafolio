from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uuid

from database import SessionLocal, engine
import models, schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS para permitir que Ionic se conecte
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8100"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Obtener sesión de DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/foods", response_model=list[schemas.Food])
def get_all_foods(db: Session = Depends(get_db)):
    return db.query(models.Food).all()

@app.get("/foods/{food_id}", response_model=schemas.Food)
def get_food(food_id: str, db: Session = Depends(get_db)):
    food = db.query(models.Food).filter(models.Food.id == food_id).first()
    if not food:
        raise HTTPException(status_code=404, detail="Alimento no encontrado")
    return food

@app.post("/foods", response_model=schemas.Food)
def add_food(food: schemas.FoodCreate, db: Session = Depends(get_db)):
    food_id = str(uuid.uuid4())[:4]
    new_food = models.Food(id=food_id, **food.dict())
    db.add(new_food)
    db.commit()
    db.refresh(new_food)
    return new_food

@app.put("/foods/{food_id}", response_model=schemas.Food)
def update_food(food_id: str, updated: schemas.FoodCreate, db: Session = Depends(get_db)):
    food = db.query(models.Food).filter(models.Food.id == food_id).first()
    if not food:
        raise HTTPException(status_code=404, detail="No encontrado")
    for key, value in updated.dict().items():
        setattr(food, key, value)
    db.commit()
    return food

@app.delete("/foods/{food_id}")
def delete_food(food_id: str, db: Session = Depends(get_db)):
    food = db.query(models.Food).filter(models.Food.id == food_id).first()
    if not food:
        raise HTTPException(status_code=404, detail="No encontrado")
    db.delete(food)
    db.commit()
    return {"detail": "Eliminado"}
