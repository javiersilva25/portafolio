from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import entrenamiento as schemas
from app.crud import entrenamiento as crud
from app.database import SessionLocal
from app.schemas.entrenamiento import RutinaCreate
from app.crud import rutina as crud_rutina
from typing import List
from app.schemas.entrenamiento import RutinaBase

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/entrenamientos", response_model=list[schemas.Entrenamiento])
def list_entrenamientos(db: Session = Depends(get_db)):
    return crud.get_entrenamientos(db)

@router.post("/entrenamientos", response_model=schemas.Entrenamiento)
def create_entrenamiento(entrenamiento: schemas.EntrenamientoCreate, db: Session = Depends(get_db)):
    return crud.create_entrenamiento(db, entrenamiento)

@router.post("/rutinas")
def crear_rutina(rutina: RutinaCreate, db: Session = Depends(get_db)):
    rutina_guardada = crud_rutina.crear_rutina(db, rutina)
    return {"mensaje": "Rutina guardada correctamente", "rutina_id": rutina_guardada.id}

@router.get("/rutinas", response_model=List[RutinaBase])
def listar_rutinas(db: Session = Depends(get_db)):
    return crud_rutina.listar_rutinas(db)

@router.get("/rutinas/{rutina_id}")
def detalle_rutina(rutina_id: int, db: Session = Depends(get_db)):
    rutina = crud_rutina.obtener_rutina_con_ejercicios(db, rutina_id)
    if rutina is None:
        return {"error": "Rutina no encontrada"}
    return rutina

@router.put("/rutinas/{rutina_id}")
def actualizar_rutina(rutina_id: int, rutina_data: RutinaCreate, db: Session = Depends(get_db)):
    return crud_rutina.actualizar_rutina(db, rutina_id, rutina_data)

@router.delete("/rutinas/{rutina_id}")
def eliminar_rutina(rutina_id: int, db: Session = Depends(get_db)):
    crud_rutina.eliminar_rutina(db, rutina_id)
    return {"mensaje": "Rutina eliminada correctamente"}
