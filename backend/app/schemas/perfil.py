from pydantic import BaseModel
from typing import Literal, Optional
from datetime import date


from pydantic import BaseModel
from typing import Literal, Optional


class ListaObjetivos(BaseModel):
    id: int
    descripcion: str

    class Config:
        from_attributes = True


class ObjetivoUsuarioBase(BaseModel):
    peso_objetivo: float
    velocidad: Literal["rapido", "pausado"]
    id_objetivo: int


class ObjetivoUsuarioCreate(ObjetivoUsuarioBase):
    pass


class ObjetivoUsuarioUpdate(ObjetivoUsuarioBase):
    pass


class ObjetivoUsuario(ObjetivoUsuarioBase):
    id: int
    usuario_id: int
    objetivo: Optional[ListaObjetivos] = None

    class Config:
        from_attributes = True






class PerfilBase(BaseModel):
    edad: int
    peso: float
    altura: float
    sexo: str
    actividad: str


class PerfilCreate(PerfilBase):
    pass


class PerfilUpdate(PerfilBase):
    pass

class Perfil(PerfilBase):
    id: int
    class Config:
        from_attributes = True

class PerfilUpdate(BaseModel):
    edad: Optional[int] = None
    peso: Optional[float] = None
    altura: Optional[float] = None
    sexo: Optional[str] = None
    actividad: Optional[str] = None



class MedidaBase(BaseModel):
    fecha: date
    nombre_medida: str
    unidad_medida: str
    valor: float

class MedidaCreate(MedidaBase):
    pass

class MedidaUpdate(MedidaBase):
    pass

class Medida(MedidaBase):
    id: int
    class Config:
        from_attributes = True