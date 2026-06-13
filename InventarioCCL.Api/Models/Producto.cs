using System;
using System.Collections.Generic;

namespace InventarioCCL.Api.Models;

public partial class Producto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public int Cantidad { get; set; }
}
