using InventarioCCL.Api.DTOs;
using InventarioCCL.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventarioCCL.Api.Controllers;

[ApiController]
[Route("productos")]
[Authorize]
public class ProductosController : ControllerBase
{

    private readonly IInventarioService _inventarioService;

    public ProductosController(IInventarioService inventarioService)
    {
        _inventarioService = inventarioService;
    }


    [HttpGet("Inventario")]
    public async Task<ActionResult<List<ProductoDto>>> GetInventario()
    {
        var inventario = await _inventarioService.ObtenerInventarioAsync();
        return Ok(inventario);
    }
}
    