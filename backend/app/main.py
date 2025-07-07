from fastapi import FastAPI
from app.routers import entrenamiento, nutricion, usuario, historial, perfil
from app.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from app.models import rutina, ejercicio
from app.routers import scraping


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(entrenamiento.router, prefix="/routers", tags=["Entrenamientos"])
app.include_router(nutricion.router, prefix="/routers", tags=["Nutrición"])
app.include_router(usuario.router, prefix="/routers", tags=["Usuarios"])
app.include_router(historial.router)
app.include_router(perfil.router, prefix="/routers", tags=["Perfil"])
app.include_router(scraping.router)
