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

  credentials :LoginRequest = {username : '', password: ''};
  loading = signal(false);
  errorMsg = signal('');

  onSubmit(){
    if(!this.credentials.username || !this.credentials.password){
      this.errorMsg.set('Completa todo los campos');
    }

    this.loading.set(true);
    this.errorMsg.set('');

    this.authService.login(this.credentials)
      .subscribe({
          next: () => {
            this.loading.set(false);
            this.router.navigate(['/inventario']);
          },
          error : (err) => {
            this.loading.set(false);
            this.errorMsg.set(
              err.status === 401 ? "Usuario o Contraseña incorrectos": "Errror al conectar con el servidor"
            )

          }
      })

    
  }

}
