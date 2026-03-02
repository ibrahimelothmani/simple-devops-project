from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import database, models, schemas, auth

router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)

@router.get("/", response_model=List[schemas.CourseResponse])
def get_courses(db: Session = Depends(database.get_db)):
    return db.query(models.Course).all()

@router.post("/", response_model=schemas.CourseResponse)
def create_course(course: schemas.CourseCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.require_role(["teacher", "admin"]))):
    new_course = models.Course(**course.model_dump(), teacher_id=current_user.id)
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(course_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.require_role(["teacher", "admin"]))):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    if current_user.role != "admin" and course.teacher_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this course")
    
    db.delete(course)
    db.commit()
