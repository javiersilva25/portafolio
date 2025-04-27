from sqlalchemy.orm import Session
from app.models.historial import Historial

def registrar_entrenamiento(db: Session, rutina_id: int, usuario_id: int):
    nuevo_historial = Historial(
        rutina_id=rutina_id,
        usuario_id=usuario_id
    )
    db.add(nuevo_historial)
    db.commit()
    db.refresh(nuevo_historial)
    return nuevo_historial

def listar_historial(db: Session, usuario_id: int):
    return db.query(Historial).filter(Historial.usuario_id == usuario_id).all()

