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

# ------------------- CRUD FOODS -------------------

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

# ------------------- CRUD EXERCISES -------------------

@app.get("/exercises", response_model=list[schemas.Exercise])
def get_all_exercises(db: Session = Depends(get_db)):
    return db.query(models.Exercise).all()

@app.get("/exercises/{exercise_id}", response_model=schemas.Exercise)
def get_exercise(exercise_id: str, db: Session = Depends(get_db)):
    exercise = db.query(models.Exercise).filter(models.Exercise.id == exercise_id).first()
    if not exercise:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")
    return exercise

@app.post("/exercises", response_model=schemas.Exercise)
def create_exercise(exercise: schemas.ExerciseCreate, db: Session = Depends(get_db)):
    new_exercise = models.Exercise(
        id=str(uuid.uuid4())[:8],
        nombre=exercise.nombre,
        video_url=exercise.video_url
    )
    db.add(new_exercise)
    db.commit()
    db.refresh(new_exercise)
    return new_exercise

@app.put("/exercises/{exercise_id}", response_model=schemas.Exercise)
def update_exercise(exercise_id: str, updated: schemas.ExerciseCreate, db: Session = Depends(get_db)):
    exercise = db.query(models.Exercise).filter(models.Exercise.id == exercise_id).first()
    if not exercise:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")
    exercise.nombre = updated.nombre
    exercise.video_url = updated.video_url
    db.commit()
    db.refresh(exercise)
    return exercise

@app.delete("/exercises/{exercise_id}")
def delete_exercise(exercise_id: str, db: Session = Depends(get_db)):
    exercise = db.query(models.Exercise).filter(models.Exercise.id == exercise_id).first()
    if not exercise:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")
    db.delete(exercise)
    db.commit()
    return {"detail": "Ejercicio eliminado"}
