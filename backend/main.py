from typing import Annotated

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.dialects.sqlite import *
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel, ConfigDict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(250), nullable=False)

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

# Connect to the database
engine = create_engine("postgresql://postgres:postgres@localhost:5432/crud")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

DBDep = Annotated[Session, Depends(get_db)]


# Health check endpoint for Kubernetes probes and monitoring
@app.get("/health")
async def health_check(res):
    res.json({"status": "ok"})

# Get all users from the database
@app.get("/users", response_model=list[UserResponse])
def get_users(db: DBDep):
    users = db.query(User).all()
    return users

# Create a new user
@app.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: DBDep):
    db_user = User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Run the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


