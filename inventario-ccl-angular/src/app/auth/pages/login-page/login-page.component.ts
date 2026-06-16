import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../interfaces/login-request.interfaces';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit():void{
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/inventario'])
    }
  }
  credentials :LoginRequest = {username : '', password: ''};
  loading = signal(false);
  errorMsg = signal('');



    onSubmit() {

      if (!this.credentials.username || !this.credentials.password) {
        this.errorMsg.set('Completa todos los campos');
        return;
      }

      this.loading.set(true);
      this.errorMsg.set('');

      this.authService.login(this.credentials)
        .subscribe({
          next: () => {
            this.loading.set(false);
            this.router.navigate(['/inventario']);
          },
          error: (err) => {
            this.loading.set(false);

            this.errorMsg.set(
              err.status === 401
                ? 'Usuario o contraseña incorrectos'
                : 'Error al conectar con el servidor'
            );
          }
        });
    } 
}
