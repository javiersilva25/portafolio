from fastapi import APIRouter, Depends, Path
from sqlalchemy.orm import Session
from app.schemas import nutricion as schemas
from app.crud import nutricion as crud
from app.database import SessionLocal
from fastapi import Query
from datetime import date
from app.security import obtener_usuario_actual
from app.schemas.usuario import UsuarioToken
from fastapi import HTTPException
from typing import Literal

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
def create_comida(comida: schemas.ComidaCreate,usuario: UsuarioToken = Depends(obtener_usuario_actual), db: Session = Depends(get_db)):
    return crud.create_comida(db, usuario.id, comida)

@router.get("/comidas/{fecha}", response_model=list[schemas.Comida])
def get_comidas( usuario: UsuarioToken = Depends(obtener_usuario_actual), fecha: date = Path(...), db: Session = Depends(get_db)):
    return crud.get_comidas_by_usuario_and_fecha(db, usuario.id, fecha)

@router.delete("/comidas/{fecha}/{tipo}")
def delete_comida(
    fecha: date,
    tipo: Literal["desayuno", "almuerzo", "cena"],
    usuario: UsuarioToken = Depends(obtener_usuario_actual),
    db: Session = Depends(get_db)
):
    eliminada = crud.delete_comida_por_tipo_y_fecha(db, usuario.id, fecha, tipo)
    if not eliminada:
        raise HTTPException(status_code=404, detail="Comida no encontrada para eliminar")
    return {"mensaje": "Comida eliminada correctamente"}


