export interface MovimientoRequest {
  productoId: number;
  tipo: 'Entrada' | 'Salida';
  cantidad: number;
}