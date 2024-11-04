using BankAppWebAPI.Data;
using BankAppWebAPI.Models;
using BankAppWebAPI.Services.Common;
using BankAppWebAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BankAppWebAPI.Services.Implementation
{
    public class DbInitializer : IDbInitializer
    {

        private readonly ApplicationDbContext _context;

        public DbInitializer(ApplicationDbContext context)
        {
            _context = context;
        }

        // Initialize the database with some initial data
        public void Initialize()
        {
            try
            {
                if (_context.Database.GetPendingMigrations().Count() > 0)
                {
                    _context.Database.Migrate();
                }
                // add initial data default user
                if (_context.Users.Count() == 0)
                {
                    string defaultUsername1 = "TestUser1";
                    string defaultPassword1 = "Test@123";

                    string defaultUsername2 = "TestUser2";
                    string defaultPassword2 = "Test@123";

                    if (!_context.Users.Any(u => u.Username == defaultUsername1) && !_context.Users.Any(u => u.Username == defaultUsername2))
                    {
                        // Add default users
                        _context.Users.AddRange(
                            new User
                            {
                                Username = defaultUsername1,
                                Password = SD.HashPassword(defaultPassword1),
                                Balance = 1000
                            },
                            new User
                            {
                                Username = defaultUsername2,
                                Password = SD.HashPassword(defaultPassword2),
                                Balance = 1000
                            }
                        );


                        _context.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while seeding the database.", ex);
            }
        }
    }
}
