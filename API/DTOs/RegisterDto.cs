using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
  public class RegisterDto
    {
      [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$", ErrorMessage = "Password need at least one number, lowercase and uppercase character, and be beetwen 8 and 16 long.")]
        public string Password { get; set; }
        [Required]
        public string Username { get; set; }
    }
}