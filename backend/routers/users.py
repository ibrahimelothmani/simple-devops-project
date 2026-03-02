from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import database, models, schemas, auth

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.get("/", response_model=List[schemas.UserResponse])
def get_users(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.require_role(["admin", "teacher"]))):
    return db.query(models.User).all()

@router.get("/me", response_model=schemas.UserResponse)
def get_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user
