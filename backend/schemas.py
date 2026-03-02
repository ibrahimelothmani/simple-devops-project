from pydantic import BaseModel, EmailStr, ConfigDict
from enum import Enum
from typing import Optional, List

class UserRole(str, Enum):
    admin = "admin"
    teacher = "teacher"
    student = "student"

class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: UserRole

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None

class CourseBase(BaseModel):
    name: str
    description: str

class CourseCreate(CourseBase):
    pass

class CourseResponse(CourseBase):
    id: int
    teacher_id: int
    model_config = ConfigDict(from_attributes=True)

class EnrollmentBase(BaseModel):
    course_id: int

class EnrollmentCreate(EnrollmentBase):
    student_id: int

class EnrollmentResponse(EnrollmentBase):
    id: int
    student_id: int
    model_config = ConfigDict(from_attributes=True)
