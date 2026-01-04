import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.API}/login`, { email, password });
  }

  register(email: string, password: string) {
    return this.http.post(`${this.API}/register`, { email, password });
  }

  logout() {
    localStorage.removeItem('token');
  }
}

