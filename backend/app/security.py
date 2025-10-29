from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from app.schemas.usuario import UsuarioToken
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import hashlib

SECRET_KEY = "MzI0JkxvTzc3ISFAVU45"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

try:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    pwd_context.hash("test")
except Exception:
    pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")

def get_password_hash(password: str):
    password_bytes = password.encode('utf-8')
    if len(password_bytes) > 72:
        password_bytes = password_bytes[:72]
    
    safe_password = password_bytes.decode('utf-8', errors='ignore')
    return pwd_context.hash(safe_password)

def verify_password(plain_password: str, hashed_password: str):
    plain_bytes = plain_password.encode('utf-8')
    if len(plain_bytes) > 72:
        plain_bytes = plain_bytes[:72]
    
    safe_password = plain_bytes.decode('utf-8', errors='ignore')
    return pwd_context.verify(safe_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def obtener_usuario_actual(token: str = Depends(oauth2_scheme)) -> UsuarioToken:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        usuario_id: int = payload.get("id")
        username: str = payload.get("username")

        if usuario_id is None or username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return UsuarioToken(id=usuario_id, username=username)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido",
            headers={"WWW-Authenticate": "Bearer"},
        )