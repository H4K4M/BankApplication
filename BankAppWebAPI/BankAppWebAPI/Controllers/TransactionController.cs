using BankAppWebAPI.Data;
using BankAppWebAPI.Models;
using BankAppWebAPI.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BankAppWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TransactionController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet("balance"), Authorize]
        public async Task<IActionResult> GetBalance()
        {
            var userId = Convert.ToInt32(User.FindFirstValue("UserId"));
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserId == userId);
            if (user is not null)
                return Ok(user.Balance); // Return the user's current balance

            return Unauthorized();
        }

        [HttpPost("deposit"), Authorize]
        public async Task<IActionResult> Deposit(TransactionVM transactionVM)
        {
            var userId = Convert.ToInt32(User.FindFirstValue("UserId"));
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserId == userId);

            if (user is not null)
            {
                user.Balance += transactionVM.Amount; // Update the balance by adding the deposit amount
                _context.Transactions.Add(new Transaction
                {
                    FromUser = user.Username,
                    Amount = transactionVM.Amount,
                    Date = DateTime.Now,
                    ActionType = "Deposit",
                    RemainingBalance = user.Balance,
                    User = user
                });
                _context.SaveChanges(); // Save changes to the database

                return Ok("Deposit Successful");
            }

            return Unauthorized(new { message = "You are not authorized to access this resource." });
        }

        [HttpPost("withdraw"), Authorize]
        public async Task<IActionResult> Withdraw(TransactionVM transactionVM)
        {
            var userId = Convert.ToInt32(User.FindFirstValue("UserId"));
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserId == userId);

            if (user is not null)
            {
                if (user.Balance < transactionVM.Amount)
                    return BadRequest("Insufficient funds"); // Check if the balance is sufficient

                user.Balance -= transactionVM.Amount; // Deduct the withdrawal amount from the balance
                _context.Transactions.Add(new Transaction
                {
                    ToUser = user.Username,
                    Amount = transactionVM.Amount,
                    Date = DateTime.Now,
                    ActionType = "Withdraw",
                    RemainingBalance = user.Balance,
                    User = user
                });
                _context.SaveChanges(); // Save changes to the database

                return Ok("Withdraw Successful");
            }
            return Unauthorized(new { message = "You are not authorized to access this resource." });
        }

        [HttpPost("transfer"), Authorize]
        public IActionResult Transfer(TransactionVM transactionVM)
        {
            var senderId = Convert.ToInt32(User.FindFirstValue("UserId"));
            var sender = _context.Users.SingleOrDefault(u => u.UserId == senderId); // Get the sender's user info
            var recipient = _context.Users.SingleOrDefault(u => u.Username == transactionVM.username); // Get the receiver's user info

            if(sender is not null)
            {
                if (sender.Balance < transactionVM.Amount)
                    return BadRequest("Insufficient funds"); // Check if the sender has enough balance
                if(recipient is null)
                    return BadRequest("Recipient not found"); // Check if the recipient exists

                sender.Balance -= transactionVM.Amount; // Deduct amount from sender
                recipient.Balance += transactionVM.Amount; // Add amount to receiver

                _context.Transactions.AddRange(
                // Sender transaction
                new Transaction
                {
                    ToUser = recipient.Username,
                    Amount = transactionVM.Amount,
                    Date = DateTime.Now,
                    ActionType = "Transfer",
                    RemainingBalance = sender.Balance,
                    User = sender
                },
                // Recipient transaction
                new Transaction
                {
                    FromUser = sender.Username,
                    Amount = transactionVM.Amount,
                    Date = DateTime.Now,
                    ActionType = "Recieve",
                    RemainingBalance = recipient.Balance,
                    User = recipient
                });
                _context.SaveChanges(); // Save changes to the database
                return Ok("Transfer Successful");
            }
            return Unauthorized(new { message = "You are not authorized to access this resource." });
        }

        [HttpGet("history"), Authorize]
        public async Task<IActionResult> GetTransactionHistory()
        {
            var userId = Convert.ToInt32(User.FindFirstValue("UserId"));
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserId == userId);

            if (user is not null)
            {
                var transactions = _context.Transactions
                .Where(t => t.UserId == user.UserId)
                .ToList(); // Retrieve the transaction history for the user
                return Ok(transactions); // Return transaction history
            }
            return Unauthorized();

        }
    }
}
