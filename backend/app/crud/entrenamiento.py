from sqlalchemy.orm import Session
from app.models.entrenamiento import Entrenamiento
from app.schemas.entrenamiento import EntrenamientoCreate

def get_entrenamientos(db: Session):
    return db.query(Entrenamiento).all()

def create_entrenamiento(db: Session, entrenamiento: EntrenamientoCreate):
    db_entrenamiento = Entrenamiento(**entrenamiento.dict())
    db.add(db_entrenamiento)
    db.commit()
    db.refresh(db_entrenamiento)
    return db_entrenamiento
