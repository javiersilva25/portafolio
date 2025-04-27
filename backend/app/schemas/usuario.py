from pydantic import BaseModel

class UsuarioBase(BaseModel):
    username: str
    email: str

class UsuarioCreate(UsuarioBase):
    password: str

class Usuario(UsuarioBase):
    id: int

    class Config:
        orm_mode = True

class UsuarioToken(BaseModel):
    id: int
    username: str