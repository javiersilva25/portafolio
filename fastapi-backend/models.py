from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from database import Base

class Food(Base):
    __tablename__ = "foods"

    id_food = Column(Integer, primary_key=True, index=True)
    descripcion = Column(String(80), index=True)
    calorias = Column(Float)
    carbohidratos = Column(Float)
    proteinas = Column(Float)
    grasas = Column(Float)
    id_usuario = Column(Integer, ForeignKey("users.id"))


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
    role = Column(String(10), default="user")  # ✅ AÑADIDO


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
