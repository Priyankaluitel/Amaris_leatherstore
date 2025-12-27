import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  access_token: string;
  role: 'ADMIN' | 'USER';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  // ✅ LOGIN
  login(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(res => {
        this.saveToken(res.access_token);
        this.saveRole(res.role);
      })
    );
  }

  // ✅ REGISTER
  register(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(res => {
        this.saveToken(res.access_token);
        this.saveRole(res.role);
      })
    );
  }

  // 🔐 TOKEN
  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // 👤 ROLE
  saveRole(role: 'ADMIN' | 'USER'): void {
    localStorage.setItem('role', role);
  }

  getRole(): 'ADMIN' | 'USER' | null {
    return localStorage.getItem('role') as 'ADMIN' | 'USER' | null;
  }

  // ✅ AUTH STATE
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  // 🚪 LOGOUT
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
  }
}

