using AkademineSistema.Dtos;
using AkademineSistema.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AkademineSistema.Controllers;

[ApiController]
[Route("Auths")]
public class AuthController : ControllerBase
{
    private readonly AcademicSystemDbContext _context;

    public AuthController(AcademicSystemDbContext context)
    {
        _context = context;
    }
    

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult> Login(LoginAuthDto loginDto)
    {
        var student = await _context.Users.OfType<Student>()
            .FirstOrDefaultAsync(u => u.Name == loginDto.username && u.Password == loginDto.password);
        if (student != null)
        {
            return Ok(new LoginResponseDto(student.Id, "student"));
        }

        var professor = await _context.Users.OfType<Professor>()
            .FirstOrDefaultAsync(u => u.Name == loginDto.username && u.Password == loginDto.password);
        if (professor != null)
        {
            return Ok(new LoginResponseDto(professor.Id, "professor"));
        }
        var administrator = await _context.Users.OfType<Administrator>()
            .FirstOrDefaultAsync(u => u.Name == loginDto.username && u.Password == loginDto.password);
        if (administrator != null)
        {
            return Ok(new LoginResponseDto(administrator.Id, "administrator"));
        }

        return Unauthorized(new ErrorDto("Invalid username or password"));
    }
}

