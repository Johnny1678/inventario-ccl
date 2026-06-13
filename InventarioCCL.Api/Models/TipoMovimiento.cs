using System.Text.Json.Serialization;

namespace InventarioCCL.Api.Models;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TipoMovimiento
{
    Entrada,
    Salida
}