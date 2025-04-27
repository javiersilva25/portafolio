from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import date

class Food(Base):
    __tablename__ = "foods"

    id_food = Column(Integer, primary_key=True, index=True, autoincrement=True)
    descripcion = Column(String(80), index=True)
    calorias = Column(Float)
    carbohidratos = Column(Float)
    proteinas = Column(Float)
    grasas = Column(Float)
    id_usuario = Column(Integer, ForeignKey("users.id"))

class DailyFood(Base):
    __tablename__ = "daily_food"

    fecha = Column(Date, default=date.today)  
    cantidad = Column(Float, default=1) 
    id_usuario = Column(Integer, ForeignKey("users.id"), primary_key=True)
    id_food = Column(Integer, ForeignKey("foods.id_food"), primary_key=True)
    id_horario = Column(Integer, ForeignKey("horario.id_horario"), primary_key=True)

class Horario(Base):
    __tablename__ = "horario"

    id_horario = Column(Integer, primary_key=True, index=True)
    descripcion = Column(String(50)) 


class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(Integer, primary_key=True, index=True)
    descripcion = Column(String(80), index=True)
    video = Column(String, nullable=True)
    id_training = Column(Integer, ForeignKey("training.id"))
    id_category = Column(Integer, ForeignKey("category.id"))


class Training(Base):
    __tablename__ = "training"

    id = Column(Integer, primary_key=True, index=True)
    descripcion = Column(String(80), index=True)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(40), index=True)
    apellido = Column(String(40), index=True)
    contrasena = Column(String(40))
    correo = Column(String(60), unique=True, index=True)
    telefono = Column(String(12))
    fec_nac = Column(Date)
    role = Column(String(10), default="user")


class Objective(Base):
    __tablename__ = "objectives"

    id = Column(Integer, primary_key=True, index=True)
    descripcion = Column(String(100))
    fecha = Column(Date)
    id_user = Column(Integer, ForeignKey("users.id"))


class Measurement(Base):
    __tablename__ = "measurements"

    id = Column(Integer, primary_key=True)
    fecha = Column(Date, primary_key=True)
    nombre = Column(String(30))
    unidad_medida = Column(String(5))
    valor = Column(Float)
    id_user = Column(Integer, ForeignKey("users.id"))


class Category(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True, index=True)
    descripcion = Column(String(60))


# ============================
# 💪 MÓDULO ENTRENAMIENTOS
# ============================

class TrainingSession(Base):
    __tablename__ = "training_sessions"

    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(Date, default=date.today)
    id_usuario = Column(Integer, ForeignKey("users.id"))


class ExercisePerformed(Base):
    __tablename__ = "exercises_performed"

    id = Column(Integer, primary_key=True, index=True)
    descripcion = Column(String(100))
    id_training = Column(Integer, ForeignKey("training_sessions.id"))


class Series(Base):
    __tablename__ = "series"

    id = Column(Integer, primary_key=True, index=True)
    repeticiones = Column(Integer)
    peso = Column(Float)
    id_exercise = Column(Integer, ForeignKey("exercises_performed.id"))
