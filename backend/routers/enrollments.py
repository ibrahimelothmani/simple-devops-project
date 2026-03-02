from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import database, models, schemas, auth

router = APIRouter(
    prefix="/enrollments",
    tags=["Enrollments"]
)

@router.post("/", response_model=schemas.EnrollmentResponse)
def enroll_student(enrollment: schemas.EnrollmentCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    if current_user.role == "student" and enrollment.student_id != current_user.id:
        raise HTTPException(status_code=403, detail="Can only enroll yourself")

    # Check if existing
    existing = db.query(models.Enrollment).filter(
        models.Enrollment.student_id == enrollment.student_id,
        models.Enrollment.course_id == enrollment.course_id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Already enrolled")

    new_enrollment = models.Enrollment(student_id=enrollment.student_id, course_id=enrollment.course_id)
    db.add(new_enrollment)
    db.commit()
    db.refresh(new_enrollment)
    return new_enrollment

@router.get("/my", response_model=List[schemas.EnrollmentResponse])
def get_my_enrollments(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    if current_user.role == "student":
        return db.query(models.Enrollment).filter(models.Enrollment.student_id == current_user.id).all()
    elif current_user.role == "teacher":
        return db.query(models.Enrollment).join(models.Course).filter(models.Course.teacher_id == current_user.id).all()
    else:
        return db.query(models.Enrollment).all()
