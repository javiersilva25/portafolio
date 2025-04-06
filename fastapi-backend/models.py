from sqlalchemy import Column, Integer, String
from database import Base

class Food(Base):
    __tablename__ = "foods"

    id = Column(String, primary_key=True, index=True)
    nombre = Column(String, index=True)
    calorias = Column(Integer)
    proteinas = Column(Integer)
    carbohidratos = Column(Integer)
    grasas = Column(Integer)

class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(String, primary_key=True, index=True)
    nombre = Column(String, index=True)