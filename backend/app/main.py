from fastapi import FastAPI
from app.routers import entrenamiento, nutricion, usuario, historial
from app.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from app.models import rutina, ejercicio


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8100"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(entrenamiento.router, prefix="/routers", tags=["Entrenamientos"])
app.include_router(nutricion.router, prefix="/routers", tags=["Nutrición"])
app.include_router(usuario.router, prefix="/routers", tags=["Usuarios"])
app.include_router(historial.router)
