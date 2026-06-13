using InventarioCCL.Api.Data;
using InventarioCCL.Api.DTOs;
using InventarioCCL.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace InventarioCCL.Api.Services
{
    public class InventarioService :IInventarioService
    {
        private readonly AppDbContext _context;

        public InventarioService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProductoDto>> ObtenerInventarioAsync()
        {
            return await _context.Productos
                .AsNoTracking()
                .Select(p => new ProductoDto
                {
                    Id = p.Id,
                    Nombre = p.Nombre,
                    Cantidad = p.Cantidad
                })
                .ToListAsync();
        }

        public async Task<(bool Ok, string? Error, MovimientoResponseDto? Resultado)> RegistrarMovimientoAsync(MovimientoRequestDto dto)
        {
            var producto = await _context.Productos.FindAsync(dto.ProductoId);

            if (producto is null)
                return (false, $"No existe un producto con id {dto.ProductoId}", null);

            if (dto.Tipo == TipoMovimiento.Salida && producto.Cantidad < dto.Cantidad)
                return (false, $"Stock insuficiente. Disponible: {producto.Cantidad}, solicitado: {dto.Cantidad}", null);

            producto.Cantidad += dto.Tipo == TipoMovimiento.Entrada ? dto.Cantidad : -dto.Cantidad;

            await _context.SaveChangesAsync();

            var resultado = new MovimientoResponseDto
            {
                Mensaje = $"Movimiento de {dto.Tipo} registrado correctamente",
                Producto = new ProductoDto
                {
                    Id = producto.Id,
                    Nombre = producto.Nombre,
                    Cantidad = producto.Cantidad
                }
            };

            return (true, null, resultado);
        }
    }
}
