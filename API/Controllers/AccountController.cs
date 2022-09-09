using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
  public class AccountController : ControllerBase
    {
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signManager;

    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signManager)
    {
        _userManager = userManager;
        _signManager = signManager;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);

        if (user == null) return Unauthorized();

        var result = await _signManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (result.Succeeded)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = "",
                Username = user.UserName
            };
        }

        return Unauthorized();
    }
  }
}