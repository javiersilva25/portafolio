from sqlalchemy.orm import Session
from app.models.rutina import Rutina
from app.models.ejercicio import Ejercicio
from app.schemas.entrenamiento import RutinaCreate

def crear_rutina(db: Session, rutina_data: RutinaCreate):
    db_rutina = Rutina(
        nombre_rutina=rutina_data.nombre_rutina,
        descripcion=rutina_data.descripcion
    )
    db.add(db_rutina)
    db.commit()
    db.refresh(db_rutina)

    for ejercicio_data in rutina_data.ejercicios:
        db_ejercicio = Ejercicio(
            nombre_ejercicio=ejercicio_data.nombre_ejercicio,
            series=ejercicio_data.series,
            repeticiones=ejercicio_data.repeticiones,
            peso=ejercicio_data.peso,
            rutina_id=db_rutina.id
        )
        db.add(db_ejercicio)

    db.commit()
    return db_rutina

def listar_rutinas(db: Session):
    return db.query(Rutina).all()

def obtener_rutina_con_ejercicios(db: Session, rutina_id: int):
    return db.query(Rutina).filter(Rutina.id == rutina_id).first()

def actualizar_rutina(db: Session, rutina_id: int, rutina_data: RutinaCreate):
    rutina = db.query(Rutina).filter(Rutina.id == rutina_id).first()
    if rutina:
        rutina.nombre_rutina = rutina_data.nombre_rutina
        rutina.descripcion = rutina_data.descripcion
        db.commit()
    return rutina

def eliminar_rutina(db: Session, rutina_id: int):
    rutina = db.query(Rutina).filter(Rutina.id == rutina_id).first()
    if rutina:
        db.delete(rutina)
        db.commit()
