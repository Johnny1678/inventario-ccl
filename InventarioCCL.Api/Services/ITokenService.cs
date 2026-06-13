namespace InventarioCCL.Api.Services
{
    public interface ITokenService
    {
        (string Token, DateTime ExpiresAt) GenerarToken(string username);
    }
}
