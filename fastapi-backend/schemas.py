from pydantic import BaseModel
from datetime import date
from typing import Optional

# ----------- FOOD -----------

class FoodBase(BaseModel):
    descripcion: str
    calorias: float
    proteinas: float
    carbohidratos: float
    grasas: float

class FoodCreate(FoodBase):
    id_usuario: int  # clave foránea

class Food(FoodBase):
    id: int
    id_usuario: int

    class Config:
        orm_mode = True


# ----------- EXERCISE -----------

class ExerciseBase(BaseModel):
    descripcion: str
    video: Optional[str] = None

class ExerciseCreate(ExerciseBase):
    id_training: Optional[int] = None
    id_category: Optional[int] = None

class Exercise(ExerciseBase):
    id: int
    id_training: Optional[int]
    id_category: Optional[int]

    class Config:
        orm_mode = True


# ----------- TRAINING -----------

class TrainingBase(BaseModel):
    descripcion: str

class TrainingCreate(TrainingBase):
    pass

class Training(TrainingBase):
    id: int

    class Config:
        orm_mode = True


# ----------- CATEGORY -----------

class CategoryBase(BaseModel):
    descripcion: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    class Config:
        orm_mode = True


# ----------- USER -----------

class UserBase(BaseModel):
    nombre: str
    apellido: str
    correo: str
    telefono: str
    fec_nac: date

class UserCreate(UserBase):
    contrasena: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True


# ----------- OBJECTIVE -----------

class ObjectiveBase(BaseModel):
    descripcion: str
    fecha: date

class ObjectiveCreate(ObjectiveBase):
    id_usuario: int

class Objective(ObjectiveBase):
    id: int
    id_usuario: int

    class Config:
        orm_mode = True


# ----------- MEASUREMENT -----------

class MeasurementBase(BaseModel):
    fecha: date
    nombre: str
    unidad_medida: str
    valor: float

class MeasurementCreate(MeasurementBase):
    id_usuario: int

class Measurement(MeasurementBase):
    id: int
    id_usuario: int

    class Config:
        orm_mode = True
