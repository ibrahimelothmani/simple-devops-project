import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers() { return this.http.get<any[]>(`${this.apiUrl}/users`); }
  getCourses() { return this.http.get<any[]>(`${this.apiUrl}/courses`); }
  createCourse(course: any) { return this.http.post<any>(`${this.apiUrl}/courses/`, course); }
  deleteCourse(id: number) { return this.http.delete(`${this.apiUrl}/courses/${id}`); }
  getEnrollments() { return this.http.get<any[]>(`${this.apiUrl}/enrollments/my`); }
  enroll(courseId: number, studentId: number) { return this.http.post<any>(`${this.apiUrl}/enrollments/`, { course_id: courseId, student_id: studentId }); }
}
