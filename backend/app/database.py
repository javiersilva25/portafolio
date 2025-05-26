from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import oracledb
import os
from dotenv import load_dotenv
from urllib.parse import quote_plus

# Cargar variables del .env
load_dotenv()

# Obtener variables de entorno
USER = os.getenv("ORACLE_USER")
RAW_PASSWORD = os.getenv("ORACLE_PASSWORD")
ENCODED_PASSWORD = quote_plus(RAW_PASSWORD)  # Codifica caracteres especiales (@, $, etc.)
DB_DSN = os.getenv("ORACLE_DSN")
WALLET_PATH = os.path.abspath(os.getenv("ORACLE_WALLET_PATH"))

oracledb.init_oracle_client(lib_dir="/home/javi/instantclient_23_8", config_dir=WALLET_PATH)

# Crear URL de conexión
DATABASE_URL = f"oracle+oracledb://{USER}:{ENCODED_PASSWORD}@{DB_DSN}"

# Crear el motor SQLAlchemy
engine = create_engine(
    DATABASE_URL,
    connect_args={"config_dir": WALLET_PATH},
)

# Crear sesión de base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para modelos
Base = declarative_base()
