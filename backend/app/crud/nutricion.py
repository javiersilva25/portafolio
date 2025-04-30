from sqlalchemy.orm import Session
from app.models import nutricion as models
from app.schemas import nutricion as schemas
from datetime import date

def get_alimentos(db: Session):
    return db.query(models.Alimento).all()

def create_alimento(db: Session, alimento: schemas.AlimentoCreate):
    db_alimento = models.Alimento(**alimento.dict())
    db.add(db_alimento)
    db.commit()
    db.refresh(db_alimento)
    return db_alimento

def create_comida(db: Session, usuario_id: int, comida: schemas.ComidaCreate):
    db_comida = models.Comida(
        tipo=comida.tipo,
        fecha=comida.fecha,
        usuario_id=usuario_id
    )
    db.add(db_comida)
    db.commit()
    db.refresh(db_comida)

    for reg in comida.registros:
        db_registro = models.RegistroAlimento(
            gramos=reg.gramos,
            alimento_id=reg.alimento_id,
            comida_id=db_comida.id
        )
        db.add(db_registro)

    db.commit()
    db.refresh(db_comida)
    return db_comida

def get_comidas_by_usuario_and_fecha(db: Session, usuario_id: int, fecha: date):
    return db.query(models.Comida).filter_by(usuario_id=usuario_id, fecha=fecha).all()
