from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.database import Base

class Alimento(Base):
    __tablename__ = "alimentos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    proteinas = Column(Float)
    carbohidratos = Column(Float)
    grasas = Column(Float)
    calorias = Column(Float)

class Comida(Base):
    __tablename__ = "comidas"

    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String, index=True)
    fecha = Column(Date, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))

    usuario = relationship("Usuario", back_populates="comidas")
    registros = relationship("RegistroAlimento", back_populates="comida", cascade="all, delete")


class RegistroAlimento(Base):
    __tablename__ = "registro_alimentos"

    id = Column(Integer, primary_key=True, index=True)
    gramos = Column(Float)
    alimento_id = Column(Integer, ForeignKey("alimentos.id"))
    comida_id = Column(Integer, ForeignKey("comidas.id"))

    alimento = relationship("Alimento")
    comida = relationship("Comida", back_populates="registros")
