from sqlalchemy.orm import Session, joinedload
from app.models.objetivo_usuario import ObjetivoUsuario
from app.models.perfil import Perfil
from app.models.objetivo import Objetivo
from app.schemas import perfil as schemas
from fastapi import HTTPException

def crear_objetivo_usuario(db: Session, usuario_id: int, objetivo_usuario: schemas.ObjetivoUsuarioCreate):
    db_objetivo_usuario = ObjetivoUsuario(
        accion=objetivo_usuario.accion,
        valor=objetivo_usuario.valor,
        id_objetivo=objetivo_usuario.id_objetivo,
        usuario_id=usuario_id
    )
    db.add(db_objetivo_usuario)
    db.commit()
    db.refresh(db_objetivo_usuario)
    return db_objetivo_usuario

def obtener_objetivo_usuario(db: Session, usuario_id: int):
    resultado = db.query(ObjetivoUsuario, Objetivo.descripcion).\
        join(Objetivo).\
        filter(ObjetivoUsuario.usuario_id == usuario_id).\
        all()

    return [
        {"id": obj.id, "accion": obj.accion, "valor": obj.valor, "descripcion_objetivo": descripcion}
        for obj, descripcion in resultado
    ]

def obtener_objetivos(db: Session):
    return db.query(Objetivo).all()

def actualizar_objetivo_usuario(db: Session, usuario_id: int, objetivo_usuario_id: int, objetivo_usuario_data: schemas.ObjetivoUsuarioUpdate):
    objetivo_usuario = db.query(ObjetivoUsuario).filter(ObjetivoUsuario.id == objetivo_usuario_id, usuario_id == usuario_id).first()
    if objetivo_usuario:
        objetivo_usuario.accion = objetivo_usuario_data.accion
        objetivo_usuario.valor = objetivo_usuario_data.valor
        objetivo_usuario.id_objetivo = objetivo_usuario_data.id_objetivo
        db.commit()
    return objetivo_usuario

def eliminar_objetivo_usuario(db: Session, usuario_id: int, objetivo_usuario_id: int):
    objetivo_usuario = db.query(ObjetivoUsuario).filter( ObjetivoUsuario.id == objetivo_usuario_id, usuario_id==usuario_id).first()
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
        fec_nac=perfil.fec_nac,
        altura=perfil.altura,
        usuario_id=usuario_id
    )
    db.add(db_perfil)
    db.commit()
    db.refresh(db_perfil)
    return db_perfil

def obtener_perfil(db: Session, usuario_id: int):
    return db.query(Perfil).filter_by(usuario_id=usuario_id).first()


