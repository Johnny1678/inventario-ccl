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

  constructor() { }

 login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(`${environment.API_URL}/auth/login`, credentials)
    .pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
      })
    );
  }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getToken():string | null{
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean{
    return !!this.getToken();
  }
}
