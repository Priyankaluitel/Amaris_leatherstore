import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string, captchaToken?: string) {
    return this.http
      .post<any>(`${this.API}/login`, {
        email,
        password,
        captchaToken: captchaToken || null,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.access_token);
        })
      );
  }

  register(email: string, password: string, role: string = 'CUSTOMER') {
    return this.http.post(`${this.API}/register`, {
      email,
      password,
      role,
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role ?? null;
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }
}
