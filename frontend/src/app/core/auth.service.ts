import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000';
  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  login(credentials: any) {
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);
    return this.http.post<any>(`${this.apiUrl}/auth/login`, formData).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.access_token);
        this.checkToken();
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  checkToken() {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.currentUser.set({
          id: 0, 
          name: '',
          email: payload.sub,
          role: payload.role
        });
      } catch (e) {
        this.logout();
      }
    }
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
}
