from pydantic import BaseModel

class FoodBase(BaseModel):
    nombre: str
    calorias: int
    proteinas: int
    carbohidratos: int
    grasas: int

class FoodCreate(FoodBase):
    pass

class Food(FoodBase):
    id: str

    class Config:
        orm_mode = True
