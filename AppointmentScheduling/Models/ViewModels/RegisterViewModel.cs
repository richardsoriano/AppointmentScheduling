using System;
using System.ComponentModel.DataAnnotations;

namespace AppointmentScheduling.Models.ViewModels
{
	public class RegisterViewModel
	{
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(100,ErrorMessage ="The {0} must be at least {2} characters long",MinimumLength =6)]
        public string Password { get; set; }
        [Compare("Password",ErrorMessage ="Passwords must match.")]
        public string ConfirmPassword { get; set; }
        [Required]
        [Display(Name="Role Name")]
        public string RoleName { get; set; }


	}
}

