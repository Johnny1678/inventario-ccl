using InventarioCCL.Api.DTOs;
using InventarioCCL.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventarioCCL.Api.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly ITokenService _tokenService;

    private const string ValidUsername = "admin";
    private const string ValidPassword = "admin123";

    public AuthController(ITokenService tokenService)
    {
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public ActionResult<LoginResponseDto> Login([FromBody] LoginRequestDto request)
    {
        if (request.Username != ValidUsername || request.Password != ValidPassword)
            return Unauthorized(new { mensaje = "Usuario o contraseña incorrectos" });

        var (token, expiresAt) = _tokenService.GenerarToken(request.Username);

        return Ok(new LoginResponseDto
        {
            Token = token,
            ExpiresAt = expiresAt
        });
    }
}