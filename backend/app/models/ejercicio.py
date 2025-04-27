from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Ejercicio(Base):
    __tablename__ = "ejercicios"

    id = Column(Integer, primary_key=True, index=True)
    nombre_ejercicio = Column(String)
    series = Column(Integer)
    repeticiones = Column(Integer)
    peso = Column(Float)

    rutina_id = Column(Integer, ForeignKey("rutinas.id"))
    rutina = relationship("Rutina", back_populates="ejercicios")
