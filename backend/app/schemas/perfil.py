from pydantic import BaseModel
from typing import Optional
from datetime import date


class ListaObjetivos(BaseModel):
    id: int
    descripcion: str

    class Config:
        from_attributes = True

class ObjetivoUsuarioBase(BaseModel):
    accion: str
    valor: float
    id_objetivo: int

class ObjetivoUsuarioCreate(ObjetivoUsuarioBase):
    pass


class ObjetivoUsuarioUpdate(ObjetivoUsuarioBase):
    pass

class Objetivo(BaseModel):
    id: int
    accion: str
    valor: float
    descripcion_objetivo: str  

    class Config:
        orm_mode = True

class PerfilBase(BaseModel):
    fec_nac: date
    altura: float


class PerfilCreate(PerfilBase):
    pass


class PerfilUpdate(PerfilBase):
    pass

class Perfil(ObjetivoUsuarioBase):
    id: int
    class Config:
        from_attributes = True