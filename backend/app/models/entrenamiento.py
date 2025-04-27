from sqlalchemy import Column, Integer, String
from app.database import Base

class Entrenamiento(Base):
    __tablename__ = "entrenamientos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    descripcion = Column(String, nullable=True)
    duracion_minutos = Column(Integer)
