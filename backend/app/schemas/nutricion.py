from pydantic import BaseModel
from typing import List
from datetime import date

class AlimentoBase(BaseModel):
    nombre: str
    proteinas: float
    carbohidratos: float
    grasas: float
    calorias: float

class AlimentoCreate(AlimentoBase):
    pass

class Alimento(AlimentoBase):
    id: int
    class Config:
        from_attributes = True


class RegistroAlimentoBase(BaseModel):
    gramos: float
    alimento_id: int

class RegistroAlimentoCreate(RegistroAlimentoBase):
    pass

class RegistroAlimento(RegistroAlimentoBase):
    id: int
    alimento: Alimento

    class Config:
        from_attributes = True

class ComidaBase(BaseModel):
    tipo: str  # desayuno, almuerzo, cena
    fecha: date
    usuario_id: int

class ComidaCreate(ComidaBase):
    registros: List[RegistroAlimentoCreate]

class Comida(ComidaBase):
    id: int
    fecha: date
    registros: List[RegistroAlimento]

    class Config:
        from_attributes = True
