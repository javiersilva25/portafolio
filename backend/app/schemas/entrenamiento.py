from pydantic import BaseModel
from typing import List, Optional

class EntrenamientoBase(BaseModel):
    nombre: str
    descripcion: str | None = None
    duracion_minutos: int

class EntrenamientoCreate(EntrenamientoBase):
    pass

class Entrenamiento(EntrenamientoBase):
    id: int

    class Config:
        orm_mode = True

class EjercicioBase(BaseModel):
    nombre_ejercicio: str
    series: int
    repeticiones: int
    peso: float

class RutinaBase(BaseModel):
    nombre_rutina: str
    descripcion: Optional[str] = None

class RutinaCreate(RutinaBase):
    ejercicios: List[EjercicioBase]
