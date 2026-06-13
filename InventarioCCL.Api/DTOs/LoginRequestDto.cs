using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace InventarioCCL.Api.DTOs
{
    public class LoginRequestDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
