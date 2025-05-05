from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.database import Base

class Perfil(Base):
    __tablename__ = "perfil_usuario"

    id = Column(Integer, primary_key=True, index=True)
    edad = Column(Integer, index=True)
    altura = Column(Float, index=True)
    actividad = Column(String, index=True)
    sexo = Column(String, index=True) 
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))

    usuario = relationship("Usuario", back_populates="perfil")