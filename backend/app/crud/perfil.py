from sqlalchemy.orm import Session, joinedload
from app.models.objetivo_usuario import ObjetivoUsuario
from app.models.perfil import Perfil
from app.models.objetivo import Objetivo
from app.models.medida import Medida
from app.schemas import perfil as schemas
from fastapi import HTTPException

def crear_objetivo_usuario(db: Session, usuario_id: int, objetivo_usuario: schemas.ObjetivoUsuarioCreate):
    db_objetivo_usuario = ObjetivoUsuario(
        peso_objetivo=objetivo_usuario.peso_objetivo,
        velocidad=objetivo_usuario.velocidad,
        id_objetivo=objetivo_usuario.id_objetivo,
        usuario_id=usuario_id
    )
    db.add(db_objetivo_usuario)
    db.commit()
    db.refresh(db_objetivo_usuario)
    return db_objetivo_usuario


def obtener_objetivos(db: Session):
    return db.query(Objetivo).all()


def obtener_objetivo_usuario(db: Session, usuario_id: int):
    return db.query(ObjetivoUsuario).filter_by(usuario_id=usuario_id).all()


def actualizar_objetivo_usuario(db: Session, usuario_id: int, objetivo_usuario_id: int, objetivo_usuario_data: schemas.ObjetivoUsuarioUpdate):
    objetivo_usuario = db.query(ObjetivoUsuario).filter(
        ObjetivoUsuario.id == objetivo_usuario_id,
        ObjetivoUsuario.usuario_id == usuario_id
    ).first()

    if objetivo_usuario:
        objetivo_usuario.peso_objetivo = objetivo_usuario_data.peso_objetivo
        objetivo_usuario.velocidad = objetivo_usuario_data.velocidad
        objetivo_usuario.id_objetivo = objetivo_usuario_data.id_objetivo
        db.commit()
        db.refresh(objetivo_usuario)

    return objetivo_usuario


def eliminar_objetivo_usuario(db: Session, usuario_id: int, objetivo_usuario_id: int):
    objetivo_usuario = db.query(ObjetivoUsuario).filter(
        ObjetivoUsuario.id == objetivo_usuario_id,
        ObjetivoUsuario.usuario_id == usuario_id
    ).first()

    if objetivo_usuario:
        db.delete(objetivo_usuario)
        db.commit()
        return True

    return False



def crear_perfil(db: Session, usuario_id: int, perfil: schemas.PerfilCreate):
    perfil_existente = db.query(Perfil).filter(Perfil.usuario_id == usuario_id).first()
    if perfil_existente:
        raise HTTPException(
            status_code=400,
            detail="El perfil ya existe para este usuario."
        )
    db_perfil = Perfil(
        edad=perfil.edad,
        peso = perfil.peso,
        altura=perfil.altura,
        usuario_id=usuario_id,
        sexo = perfil.sexo,
        actividad = perfil.actividad
    )
    db.add(db_perfil)
    db.commit()
    db.refresh(db_perfil)
    return db_perfil

def obtener_perfil(db: Session, usuario_id: int):
    return db.query(Perfil).filter_by(usuario_id=usuario_id).first()



def crear_medida(db: Session, usuario_id: int, medida: schemas.MedidaCreate):
    db_medida = Medida(
        fecha=medida.fecha,
        nombre_medida=medida.nombre_medida,
        unidad_medida=medida.unidad_medida,
        valor=medida.valor,
        usuario_id=usuario_id
    )
    db.add(db_medida)
    db.commit()
    db.refresh(db_medida)
    return db_medida

def crear_medida_por_nombre(db: Session, usuario_id: int, nombre_medida: str, medida: schemas.MedidaCreate):
    db_medida = Medida(
        fecha=medida.fecha,
        nombre_medida=nombre_medida,
        unidad_medida=medida.unidad_medida,
        valor=medida.valor,
        usuario_id=usuario_id
    )
    db.add(db_medida)
    db.commit()
    db.refresh(db_medida)
    return db_medida

def obtener_medidas(db: Session, usuario_id: int):
    return db.query(Medida).filter_by(usuario_id=usuario_id).all()

def actualizar_medida(db: Session, usuario_id: int, medida_id: int, medida_data: schemas.MedidaUpdate):
    medida = db.query(Medida).filter(Medida.id == medida_id, usuario_id == usuario_id).first()
    if medida:
        medida.valor = medida_data.valor
        db.commit()
    return medida

def eliminar_medida(db: Session, usuario_id: int, medida_id: int):
    medida = db.query(Medida).filter( Medida.id == medida_id, usuario_id==usuario_id).first()
    if medida:
        db.delete(medida)
        db.commit()
        return True
    return False

