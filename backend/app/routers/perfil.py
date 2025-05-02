from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import perfil as schemas
from app.crud import perfil as crud
from app.database import SessionLocal
from app.security import obtener_usuario_actual
from app.schemas.usuario import UsuarioToken

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/objetivos/usuario", response_model=list[schemas.Objetivo])
def get_objetivo_usuario(
    db: Session = Depends(get_db),
    usuario: UsuarioToken = Depends(obtener_usuario_actual)
):
    objetivo = crud.obtener_objetivo_usuario(db, usuario.id)
    if not objetivo:
        raise HTTPException(status_code=404, detail="Objetivo no encontrado")
    return objetivo

@router.get("/objetivos", response_model=list[schemas.ListaObjetivos])
def get_objetivos(db:Session = Depends(get_db)):
    return crud.obtener_objetivos(db)

@router.post("/objetivos", response_model=schemas.ObjetivoUsuarioBase)
def create_objetivo_usuario(
    objetivo_usuario: schemas.ObjetivoUsuarioCreate,
    db: Session = Depends(get_db),
    usuario: UsuarioToken = Depends(obtener_usuario_actual)
):
    return crud.crear_objetivo_usuario(db, usuario.id, objetivo_usuario)

@router.put("/objetivos/{objetivo_id}", response_model=schemas.ObjetivoUsuarioBase)
def update_objetivo_usuario(
    objetivo_id: int,
    objetivo_usuario_data: schemas.ObjetivoUsuarioUpdate,
    db: Session = Depends(get_db),
    usuario: UsuarioToken = Depends(obtener_usuario_actual)
):
    objetivo = crud.actualizar_objetivo_usuario(db, usuario.id, objetivo_id, objetivo_usuario_data)
    if not objetivo:
        raise HTTPException(status_code=404, detail="Objetivo no encontrado")
    return objetivo

@router.delete("/objetivos/{objetivo_id}")
def delete_objetivo_usuario(
    objetivo_id: int,
    db: Session = Depends(get_db),
    usuario: UsuarioToken = Depends(obtener_usuario_actual)
):
    success = crud.eliminar_objetivo_usuario(db, usuario.id, objetivo_id)
    if not success:
        raise HTTPException(status_code=404, detail="Objetivo no encontrado")
    return {"mensaje": "Objetivo eliminado"}



@router.get("/perfil", response_model=schemas.Perfil)
def get_perfil(
    db: Session = Depends(get_db),
    usuario: UsuarioToken = Depends(obtener_usuario_actual)
):
    return crud.obtener_perfil(db, usuario.id)

@router.post("/perfil", response_model=schemas.PerfilBase)
def create_perfil(
    perfil: schemas.PerfilCreate,
    db: Session = Depends(get_db),
    usuario: UsuarioToken = Depends(obtener_usuario_actual)
):
    return crud.crear_perfil(db, usuario.id, perfil)
