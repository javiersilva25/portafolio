from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base

class Rutina(Base):
    __tablename__ = "rutinas"

    id = Column(Integer, primary_key=True, index=True)
    nombre_rutina = Column(String, index=True)
    descripcion = Column(String, nullable=True)

    ejercicios = relationship("Ejercicio", back_populates="rutina", cascade="all, delete-orphan")
