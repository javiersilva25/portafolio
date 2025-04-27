from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Alimento(Base):
    __tablename__ = "alimentos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    proteinas = Column(Float)
    carbohidratos = Column(Float)
    grasas = Column(Float)
    calorias = Column(Float)
