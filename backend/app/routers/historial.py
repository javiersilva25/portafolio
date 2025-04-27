from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.crud import historial as crud_historial
from app.security import obtener_usuario_actual
from app.schemas.usuario import UsuarioToken

router = APIRouter(
    prefix="/routers",
    tags=["Historial"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/historial/{rutina_id}")
def registrar_entrenamiento(
    rutina_id: int,
    db: Session = Depends(get_db),
    usuario: UsuarioToken = Depends(obtener_usuario_actual)
):
    return crud_historial.registrar_entrenamiento(db, rutina_id, usuario.id)

@router.get("/historial")
def listar_historial(
    db: Session = Depends(get_db),
    usuario: UsuarioToken = Depends(obtener_usuario_actual)
):
    return crud_historial.listar_historial(db, usuario.id)
