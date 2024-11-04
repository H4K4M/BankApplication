using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankAppWebAPI.Models
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public DateTime Date { get; set; }
        public string ActionType { get; set; } // Deposit, Withdraw, Transfer
        public decimal Amount { get; set; }
        public string? FromUser { get; set; }
        public string? ToUser { get; set; }
        public decimal RemainingBalance { get; set; }

        // Foreign key to User
        [ForeignKey("User")]
        public int UserId { get; set; }
        // Foreign Key
        [ValidateNever]
        public User User { get; set; }
    }
}
