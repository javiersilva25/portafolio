from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import nutricion as schemas
from app.crud import nutricion as crud
from app.database import SessionLocal

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
