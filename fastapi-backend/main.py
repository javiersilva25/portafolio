from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta

from database import SessionLocal, engine
import models, schemas

# Crear las tablas
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configuración CORS (para permitir conexión con Ionic)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8100"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependencia para obtener sesión de DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# =======================
# AUTENTICACIÓN Y USUARIO
# =======================

SECRET_KEY = "supersecreta"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    user_exists = db.query(models.User).filter(models.User.correo == user.correo).first()
    if user_exists:
        raise HTTPException(status_code=400, detail="El usuario ya existe")

    new_user = models.User(
        nombre=user.nombre,
        apellido=user.apellido,
        correo=user.correo,
        telefono=user.telefono,
        fec_nac=user.fec_nac,
        contrasena=hash_password(user.contrasena),
        role="user"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"msg": "Usuario creado correctamente"}
            
@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.correo == form_data.username).first()
    if not user or not verify_password(form_data.password, user.contrasena):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    token_data = {
        "sub": user.correo,
        "role": user.role
    }

    access_token = create_access_token(token_data)
    return {"access_token": access_token, "token_type": "bearer"}

# ========================
# CRUD FOODS
# ========================

@app.get("/foods", response_model=list[schemas.Food])
def get_all_foods(db: Session = Depends(get_db)):
    return db.query(models.Food).all()

@app.get("/foods/{food_id}", response_model=schemas.Food)
def get_food(food_id: int, db: Session = Depends(get_db)):
    food = db.query(models.Food).filter(models.Food.id == food_id).first()
    if not food:
        raise HTTPException(status_code=404, detail="Alimento no encontrado")
    return food

@app.post("/foods", response_model=schemas.Food)
def add_food(food: schemas.FoodCreate, db: Session = Depends(get_db)):
    new_food = models.Food(
        descripcion = food.descripcion,
        calorias = food.calorias,
        proteinas = food.proteinas,
        grasas = food.grasas,
        carbohidratos = food.carbohidratos,
        id_usuario = 2
    )
    db.add(new_food)
    db.commit()
    db.refresh(new_food)
    return new_food

@app.put("/foods/{food_id}", response_model=schemas.Food)
def update_food(food_id: int, updated: schemas.FoodCreate, db: Session = Depends(get_db)):
    food = db.query(models.Food).filter(models.Food.id == food_id).first()
    if not food:
        raise HTTPException(status_code=404, detail="No encontrado")
    for key, value in updated.dict().items():
        setattr(food, key, value)
    db.commit()
    db.refresh(food)
    return food

@app.delete("/foods/{food_id}")
def delete_food(food_id: int, db: Session = Depends(get_db)):
    food = db.query(models.Food).filter(models.Food.id == food_id).first()
    if not food:
        raise HTTPException(status_code=404, detail="No encontrado")
    db.delete(food)
    db.commit()
    return {"detail": "Eliminado"}

# ========================
# CRUD EXERCISES
# ========================

@app.get("/exercises", response_model=list[schemas.Exercise])
def get_all_exercises(db: Session = Depends(get_db)):
    return db.query(models.Exercise).all()

@app.get("/exercises/{exercise_id}", response_model=schemas.Exercise)
def get_exercise(exercise_id: int, db: Session = Depends(get_db)):
    exercise = db.query(models.Exercise).filter(models.Exercise.id == exercise_id).first()
    if not exercise:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")
    return exercise

@app.post("/exercises", response_model=schemas.Exercise)
def create_exercise(exercise: schemas.ExerciseCreate, db: Session = Depends(get_db)):
    new_exercise = models.Exercise(
        descripcion=exercise.descripcion,
        video=exercise.video,
        id_training=exercise.id_training,
        id_category=exercise.id_category
    )
    db.add(new_exercise)
    db.commit()
    db.refresh(new_exercise)
    return new_exercise

@app.put("/exercises/{exercise_id}", response_model=schemas.Exercise)
def update_exercise(exercise_id: int, updated: schemas.ExerciseCreate, db: Session = Depends(get_db)):
    exercise = db.query(models.Exercise).filter(models.Exercise.id == exercise_id).first()
    if not exercise:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")
    for key, value in updated.dict().items():
        setattr(exercise, key, value)
    db.commit()
    db.refresh(exercise)
    return exercise

@app.delete("/exercises/{exercise_id}")
def delete_exercise(exercise_id: int, db: Session = Depends(get_db)):
    exercise = db.query(models.Exercise).filter(models.Exercise.id == exercise_id).first()
    if not exercise:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")
    db.delete(exercise)
    db.commit()
    return {"detail": "Ejercicio eliminado"}

@app.get("/user/{correo}", response_model=schemas.UserResponse)
def get_user_data(correo: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.correo == correo).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    return {
        "nombre": user.nombre,
        "correo": user.correo
    }
