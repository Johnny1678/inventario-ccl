import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../interfaces/login-request.interfaces';
import { LoginResponse } from '../interfaces/login-response.interface';
import { tap } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

private readonly TOKEN_KEY = 'ccl_token';
private readonly EXPIRES_KEY = 'ccl_token_expiration';

  constructor() { }

  login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${environment.API_URL}/auth/login`,
      credentials
    ).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.EXPIRES_KEY, response.expiresAt);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRES_KEY);
    this.router.navigate(['/login']);
  }

  getToken():string | null{
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {

    const token = localStorage.getItem(this.TOKEN_KEY);
    const expiresAt = localStorage.getItem(this.EXPIRES_KEY);

    if (!token || !expiresAt) {
      return false;
    }

    return new Date(expiresAt) > new Date();
  }
}
