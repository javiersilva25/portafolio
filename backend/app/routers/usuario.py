from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.database import SessionLocal
from app.schemas import usuario as schemas
from app.crud import usuario as crud
from app.security import create_access_token
from app.models.usuario import Usuario

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=schemas.Usuario)
def register(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = crud.get_usuario_by_username(db, username=usuario.username)
    if db_usuario:
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    return crud.create_usuario(db, usuario)

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")
    
    access_token = create_access_token(data={"id": user.id, "username": user.username})
    return {"access_token": access_token, "token_type": "bearer"}
