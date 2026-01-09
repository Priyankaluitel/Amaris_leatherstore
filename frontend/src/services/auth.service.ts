import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  // Login with email, password, captchaToken
login(email: string, password: string, captchaToken: string) {
  return this.http.post<any>('http://localhost:3000/auth/login', {
    email,
    password,
    captchaToken,
  }).pipe(
    tap(res => {
      localStorage.setItem('token', res.access_token);
    })
  );
}


  // Register (optional)
  register(email: string, password: string, role: string = 'CUSTOMER') {
    return this.http.post(`${this.API}/register`, { email, password, role });
  }

  // Get JWT from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Decode JWT and get user role
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch {
      return null;
    }
  }

  // Check if user is admin
  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout user
  logout() {
    localStorage.removeItem('token');
  }
}

