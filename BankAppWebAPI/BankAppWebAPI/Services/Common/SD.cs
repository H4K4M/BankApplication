using System.Security.Cryptography;
using System.Text;
using BCrypt.Net;

namespace BankAppWebAPI.Services.Common
{
    public class SD
    {
        public static string HashPassword(string password)
        {
            //using var sha256 = SHA256.Create();
            //byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            //return Convert.ToBase64String(bytes);
            return password = BCrypt.Net.BCrypt.HashPassword(password); 
        }
    }
}
