using InventarioCCL.Api.Models;
using System.ComponentModel.DataAnnotations;

namespace InventarioCCL.Api.DTOs
{
    public class MovimientoRequestDto
    {
        [Required]
        public int ProductoId { get; set; }

        [Required]
        public TipoMovimiento Tipo { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "La cantidad debe ser mayor a 0")]
        public int Cantidad { get; set; }
    }
}
