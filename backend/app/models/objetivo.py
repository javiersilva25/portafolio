from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.database import Base

class Objetivo(Base):
    __tablename__ = "objetivo"

    id = Column(Integer, primary_key=True, index=True)
    descripcion = Column(String, index=True)

    objetivo_usuario = relationship("ObjetivoUsuario", back_populates="objetivo")