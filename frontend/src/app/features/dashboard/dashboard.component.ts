import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { ApiService } from '../../core/api.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="dashboard">
      <nav class="navbar">
        <h2>School Management System</h2>
        <div class="user-info">
          <span>Welcome, {{ authService.currentUser()?.email }} ({{ authService.currentUser()?.role }})</span>
          <button (click)="logout()" class="btn btn-sm btn-danger">Logout</button>
        </div>
      </nav>

      <div class="content">
        <!-- Admin/Teacher View -->
        <div *ngIf="authService.currentUser()?.role !== 'student'">
          <h3>Manage Courses</h3>
          
          <div *ngIf="authService.currentUser()?.role === 'teacher'" class="add-course">
            <h4>Add Course</h4>
            <input [(ngModel)]="newCourse.name" placeholder="Course Name" class="form-control mb-2">
            <input [(ngModel)]="newCourse.description" placeholder="Description" class="form-control mb-2">
            <button (click)="addCourse()" class="btn btn-primary">Create Course</button>
          </div>

          <table class="table">
            <thead>
              <tr><th>ID</th><th>Name</th><th>Description</th><th>Actions</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let course of courses">
                <td>{{course.id}}</td>
                <td>{{course.name}}</td>
                <td>{{course.description}}</td>
                <td>
                  <button class="btn btn-danger btn-sm" (click)="deleteCourse(course.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Student View -->
        <div *ngIf="authService.currentUser()?.role === 'student'">
          <h3>Available Courses</h3>
          <table class="table">
            <thead>
              <tr><th>Name</th><th>Description</th><th>Action</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let course of courses">
                <td>{{course.name}}</td>
                <td>{{course.description}}</td>
                <td>
                  <button class="btn btn-success btn-sm" (click)="enroll(course.id)">Enroll</button>
                </td>
              </tr>
            </tbody>
          </table>

          <h3 class="mt-4">My Enrollments</h3>
          <ul>
            <li *ngFor="let enr of enrollments">Course ID: {{enr.course_id}}</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { padding: 20px; }
    .navbar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 20px; }
    .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    .table th { background-color: #f2f2f2; }
    .btn { padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer; color: white; margin-right: 5px; }
    .btn-primary { background: #007bff; }
    .btn-danger { background: #dc3545; }
    .btn-success { background: #28a745; }
    .btn-sm { padding: 4px 8px; font-size: 0.875rem; }
    .form-control { width: 100%; max-width: 300px; padding: 8px; border: 1px solid #ccc; border-radius: 4px; display: block; }
    .mb-2 { margin-bottom: 10px; }
    .mt-4 { margin-top: 20px; }
    .user-info span { margin-right: 15px; font-weight: bold; }
    .add-course { background: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
  `]
})
export class DashboardComponent implements OnInit {
  courses: any[] = [];
  enrollments: any[] = [];
  newCourse = { name: '', description: '' };

  constructor(public authService: AuthService, private api: ApiService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.getCourses().subscribe(data => this.courses = data);
    if (this.authService.currentUser()?.role === 'student' || this.authService.currentUser()?.role === 'teacher') {
      this.api.getEnrollments().subscribe(data => this.enrollments = data);
    }
  }

  addCourse() {
    this.api.createCourse(this.newCourse).subscribe(() => {
      this.loadData();
      this.newCourse = { name: '', description: '' };
    });
  }

  deleteCourse(id: number) {
    this.api.deleteCourse(id).subscribe(() => this.loadData());
  }

  enroll(courseId: number) {
    const user = this.authService.currentUser();
    if(user) {
        // Assume student user id from token (or fetched from /me). Using dummy logic since ID isn't in token yet.
        // I will just use 3 for student Ibrahim. In a real app the route should use current user implicitly,
        // Wait, the backend uses current_user.id for enrollments, so it requires student_id to match.
        // Actually, we can fetch users to find our ID, or backend could ignore student_id and use current_user.
        // Let's pass 3 for now, or fetch users to get my id.
        this.api.getUsers().subscribe(users => {
          const myUser = users.find(u => u.email === user.email);
          if (myUser) {
            this.api.enroll(courseId, myUser.id).subscribe({
              next: () => this.loadData(),
              error: err => alert(err.error?.detail || 'Error enrolling')
            });
          }
        });
    }
  }

  logout() {
    this.authService.logout();
  }
}
