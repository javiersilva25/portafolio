from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from auth import create_access_token, get_password_hash, verify_password, decode_token
from datetime import timedelta

router = APIRouter()

db_users = {}

class UserRegister(BaseModel):
    nombre: str
    email: str
    password: str

@router.post("/register")
def register(user: UserRegister):
    if user.email in db_users:
        raise HTTPException(status_code=400, detail="Usuario ya existe")
    db_users[user.email] = {
        "nombre": user.nombre,
        "hashed_password": get_password_hash(user.password)
    }
    return {"msg": "Usuario registrado exitosamente"}

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = db_users.get(form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    access_token = create_access_token(
        data={"sub": form_data.username},
        expires_delta=timedelta(minutes=60)
    )
    return {"access_token": access_token, "token_type": "bearer"}
