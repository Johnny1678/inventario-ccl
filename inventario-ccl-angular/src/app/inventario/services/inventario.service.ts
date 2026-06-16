import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../interfaces/Producto.interface';
import { environment } from '@environments/environment';
import { MovimientoRequest } from '../interfaces/Movimientos-Request.interface';
import { MovimientoResponse } from '../interfaces/Movimiento-Request.interface';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private getHeaders(): HttpHeaders{
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }

  getInventario(){
    return this.http.get<Producto[]>(`${environment.API_URL}/productos/Inventario`,{
      headers: this.getHeaders()
    })
  }
 
registrarMovimiento(movimiento: MovimientoRequest) {
  return this.http.post<MovimientoResponse>(
    `${environment.API_URL}/productos/movimiento`,
    movimiento,      
    { headers: this.getHeaders() } 
    
  );
}



}
