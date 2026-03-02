import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>School Management Login</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Email</label>
          <input type="email" [(ngModel)]="email" name="email" required class="form-control">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" [(ngModel)]="password" name="password" required class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <div class="error" *ngIf="error">{{error}}</div>
      </form>
    </div>
  `,
  styles: [`
    .login-container { max-width: 400px; margin: 100px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    h2 { text-align: center; margin-bottom: 20px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; }
    .form-control { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    .btn { width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .btn:hover { background: #0056b3; }
    .error { color: red; margin-top: 10px; text-align: center; }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => this.error = 'Invalid credentials'
    });
  }
}
