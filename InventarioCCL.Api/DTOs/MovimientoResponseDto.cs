namespace InventarioCCL.Api.DTOs
{
    public class MovimientoResponseDto
    {
        public string Mensaje { get; set; } = string.Empty;
        public ProductoDto Producto { get; set; } = new();
    }
}
