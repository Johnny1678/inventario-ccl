namespace InventarioCCL.Api.DTOs
{
    public class ProductoDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public int Cantidad { get; set; }
    }
}
