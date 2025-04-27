from pydantic import BaseModel
from datetime import date
from typing import Optional, List

# ----------- FOOD -----------

class FoodBase(BaseModel):
    descripcion: str
    calorias: float
    proteinas: float
    carbohidratos: float
    grasas: float

class FoodCreate(FoodBase):
    id_usuario: int

class Food(FoodBase):
    id_food: int

    class Config:
        orm_mode = True

class DailyFoodBase(BaseModel):
    fecha: date  # Fecha de la comida
    cantidad: float = 1  # Cantidad de porciones consumidas
    id_usuario: int  # ID del usuario
    id_food: int  # ID del alimento
    id_horario: int  # ID del horario (Desayuno, Almuerzo, Cena)

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
    role: str

class UserCreate(UserBase):
    contrasena: str

class User(UserBase):
    id: int
    role: str

    class Config:
        orm_mode = True

class UserResponse(BaseModel):
    nombre: str
    correo: str


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


# ================
# 💪 ENTRENAMIENTOS
# ================

# ----------- SERIES -----------

class SeriesBase(BaseModel):
    repeticiones: int
    peso: float

class SeriesCreate(SeriesBase):
    id_exercise: int

class Series(SeriesBase):
    id: int
    id_exercise: int

    class Config:
        orm_mode = True


# ----------- EXERCISES PERFORMED -----------

class ExercisePerformedBase(BaseModel):
    descripcion: str

class ExercisePerformedCreate(ExercisePerformedBase):
    id_training: int
    series: List[SeriesBase] = []

class ExercisePerformed(ExercisePerformedBase):
    id: int
    id_training: int
    series: List[Series] = []

    class Config:
        orm_mode = True


# ----------- TRAINING SESSION -----------

class TrainingSessionBase(BaseModel):
    fecha: date

class TrainingSessionCreate(TrainingSessionBase):
    id_usuario: int
    ejercicios: List[ExercisePerformedCreate]

class TrainingSession(TrainingSessionBase):
    id: int
    id_usuario: int
    ejercicios: List[ExercisePerformed] = []

    class Config:
        orm_mode = True
