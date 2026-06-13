using InventarioCCL.Api.DTOs;

namespace InventarioCCL.Api.Services
{
    public interface IInventarioService
    {
        Task<List<ProductoDto>> ObtenerInventarioAsync();
        Task<(bool Ok, string? Error, MovimientoResponseDto? Resultado)> RegistrarMovimientoAsync(MovimientoRequestDto dto);
    }
}
