from sqlalchemy.orm import Session
from app.models.nutricion import Alimento
from app.schemas.nutricion import AlimentoCreate

def get_alimentos(db: Session):
    return db.query(Alimento).all()

def create_alimento(db: Session, alimento: AlimentoCreate):
    db_alimento = Alimento(**alimento.dict())
    db.add(db_alimento)
    db.commit()
    db.refresh(db_alimento)
    return db_alimento
