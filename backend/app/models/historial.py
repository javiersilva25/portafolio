from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class Historial(Base):
    __tablename__ = "historial"

    id = Column(Integer, primary_key=True, index=True)
    rutina_id = Column(Integer, ForeignKey("rutinas.id"))
    usuario_id = Column(Integer, nullable=False)  # Agregamos esta línea
    fecha_realizacion = Column(DateTime, default=datetime.utcnow)

    rutina = relationship("Rutina")
