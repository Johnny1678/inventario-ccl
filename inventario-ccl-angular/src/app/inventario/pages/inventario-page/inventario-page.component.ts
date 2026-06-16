import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InventarioService } from '../../services/inventario.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Producto } from '../../interfaces/Producto.interface';
import { MovimientoRequest } from '../../interfaces/Movimientos-Request.interface';

@Component({
  selector: 'app-inventario-page',
  imports: [FormsModule],
  templateUrl: './inventario-page.component.html',
  styleUrl: './inventario-page.component.css'
})
export class InventarioPageComponent {

  private inventarioService = inject(InventarioService);
  private authService = inject(AuthService);

  productos = signal<Producto[]>([]);
  loading = signal(false);
  errorMsg = signal('');
  successMsg = signal('');

  modalAbierto = signal(false);
  productoSeleccionado = signal<Producto| null>(null);

  movimiento: MovimientoRequest = {
    productoId: 0,
    tipo: 'Entrada',
    cantidad: 1
  };

  ngOnInit() {
    this.cargarInventario();
  }

  cargarInventario() {
    this.loading.set(true);
    this.inventarioService.getInventario().subscribe({
      next: (data) => {
        this.productos.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMsg.set('Error al cargar el inventario');
        this.loading.set(false);
      }
    });
  }

  abrirModal(producto: Producto) {
    this.productoSeleccionado.set(producto);
    this.movimiento = { productoId: producto.id, tipo: 'Entrada', cantidad: 1 };
    this.successMsg.set('');
    this.errorMsg.set('');
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
    this.productoSeleccionado.set(null);
  }

  registrarMovimiento() {
    this.inventarioService.registrarMovimiento(this.movimiento).subscribe({
      next: (res) => {        
        this.successMsg.set(res.mensaje);
        this.productos.update(lista =>
          lista.map(p => p.id === res.producto.id ? res.producto : p)
        );
        setTimeout(() => this.cerrarModal(), 1200);
      },
      error: (err) => {        
        this.errorMsg.set(err.error?.mensaje ?? 'Error al registrar movimiento');
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
