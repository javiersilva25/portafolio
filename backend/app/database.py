from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Ruta del archivo SQLite (se creará automáticamente si no existe)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'database.db')}"

# Crear el motor
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

# Configuración de sesión
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Clase base
Base = declarative_base()
