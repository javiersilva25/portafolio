from pydantic import BaseModel

# ----------- FOOD -----------

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

# ----------- EXERCISE -----------

class ExerciseBase(BaseModel):
    nombre: str
    video_url: str | None = None

class ExerciseCreate(ExerciseBase):
    pass

class Exercise(ExerciseBase):
    id: str

    class Config:
        orm_mode = True

# ----------- USER -----------

class UserBase(BaseModel):
    username: str
    email: str
    nombre: str
    edad: int
    sexo: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: str

    class Config:
        orm_mode = True
