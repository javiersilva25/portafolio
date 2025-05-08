from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base
from .perfil import Perfil
from .medida import Medida
from .objetivo_usuario import ObjetivoUsuario

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    comidas = relationship("Comida", back_populates="usuario", cascade="all, delete")
    perfil = relationship("Perfil", back_populates="usuario", uselist=False, lazy="select")
    medidas = relationship("Medida", back_populates="usuario", cascade="all, delete")
    objetivo_usuario = relationship("ObjetivoUsuario", back_populates="usuario", cascade="all, delete")