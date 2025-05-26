from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.database import Base
from .objetivo import Objetivo

class ObjetivoUsuario(Base):
    __tablename__ = "objetivo_usuario"

    id = Column(Integer, primary_key=True)
    peso_objetivo = Column(Float)
    velocidad = Column(String)
    id_objetivo = Column(Integer, ForeignKey("objetivo.id"))
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))

    usuario = relationship("Usuario", back_populates="objetivo_usuario")
    objetivo = relationship("Objetivo", back_populates="objetivo_usuario", lazy="joined")