using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
  public class AccountController : ControllerBase
    {
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signManager;
    private readonly TokenService _tokenService;

    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signManager, TokenService tokenService)
    {
        _userManager = userManager;
        _signManager = signManager;
        _tokenService = tokenService;
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
                Token = _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }

        return Unauthorized();
    }

    [HttpPost("register")]
  public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
  {
    if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
    {
        return BadRequest("Email taken");
    }
    if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
    {
        return BadRequest("Username taken");
    }

    var user = new AppUser
    {
        DisplayName = registerDto.DisplayName,
        Email = registerDto.Email,
        UserName = registerDto.Username
    };

    var result = await _userManager.CreateAsync(user, registerDto.Password);

    if (result.Succeeded)
    {
        return new UserDto
        {
            DisplayName = user.DisplayName,
            Image = null,
            Token = _tokenService.CreateToken(user),
            Username = user.UserName
        };
    }

    return BadRequest();
  }
  }
}