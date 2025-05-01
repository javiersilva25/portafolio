from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.database import Base

class Medida(Base):
    __tablename__ = "medida_usuario"

    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(Date, index=True)
    nombre_medida = Column(String, index=True)
    unidad_medida = Column(String, index=True)
    valor = Column(Float, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))

    usuario = relationship("Usuario", back_populates="medidas")