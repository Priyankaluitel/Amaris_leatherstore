import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

login(email: string, password: string) {
  return this.http.post<any>(`${this.apiUrl}/login`, {
    email,
    password,
  }).pipe(
    tap((res) => {
      localStorage.setItem('token', res.access_token);
    })
  );
}
getUserRole(): string | null {
  const token = this.getToken();
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.role;
}

isAdmin(): boolean {
  return this.getUserRole() === 'ADMIN';
}


  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
