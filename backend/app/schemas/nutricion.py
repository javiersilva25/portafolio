from pydantic import BaseModel

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
        orm_mode = True
