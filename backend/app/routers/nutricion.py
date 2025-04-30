from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import nutricion as schemas
from app.crud import nutricion as crud
from app.database import SessionLocal
from fastapi import Query
from datetime import date

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/alimentos", response_model=list[schemas.Alimento])
def list_alimentos(db: Session = Depends(get_db)):
    return crud.get_alimentos(db)

@router.post("/alimentos", response_model=schemas.Alimento)
def create_alimento(alimento: schemas.AlimentoCreate, db: Session = Depends(get_db)):
    return crud.create_alimento(db, alimento)

@router.post("/comidas", response_model=schemas.Comida)
def create_comida(comida: schemas.ComidaCreate, db: Session = Depends(get_db)):
    return crud.create_comida(db, comida)

@router.get("/comidas/{fecha}", response_model=list[schemas.Comida])
def get_comidas(usuario_id: int, fecha: date = Query(...), db: Session = Depends(get_db)):
    return crud.get_comidas_by_usuario_and_fecha(db, usuario_id, fecha)
