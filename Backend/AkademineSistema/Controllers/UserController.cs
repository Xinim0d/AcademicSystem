using AkademineSistema.Dtos;
using AkademineSistema.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AkademineSistema.Controllers;

[ApiController]
[Route("Users")]
public class UserController : ControllerBase
{
    private readonly AcademicSystemDbContext _context;
    
    public UserController(AcademicSystemDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<GetUserDto>> Create(CreateUserDto createUserDto)
    {
        if (createUserDto.role.ToLower() == "student")
        {
            var newStudent = new Student()
            {
                Name = createUserDto.name,
                LastName = createUserDto.lastName,
                Email = createUserDto.email,
                Password = createUserDto.password,
                GroupId = createUserDto.groupId!.Value
            };

            _context.Users.Add(newStudent);
            await _context.SaveChangesAsync();

            return Created("",
                new GetUserDto(newStudent.Id, newStudent.Name, newStudent.LastName, newStudent.Email,
                    newStudent.Password, newStudent.GroupId));
        }

        var newProfessor = new Professor()
        {
            Name = createUserDto.name,
            LastName = createUserDto.lastName,
            Email = createUserDto.email,
            Password = createUserDto.password
        };

        _context.Users.Add(newProfessor);
        await _context.SaveChangesAsync();

        return Created("",
            new GetUserDto(newProfessor.Id, newProfessor.Name, newProfessor.LastName, newProfessor.Email,
                newProfessor.Password));

    }

    [HttpGet]
    public async Task<ActionResult> GetUserList()
    {
        
        var students = await _context.Users.OfType<Student>().ToListAsync();

        var professors = await _context.Users.OfType<Professor>().ToListAsync();
        
        var administrators = await _context.Users.OfType<Administrator>().ToListAsync();

        var result = new
        {
            Students = students.Select(u => new GetUserDto(u.Id, u.Name, u.LastName, u.Email,
                u.Password, u.GroupId)),
            Professors = professors.Select(p => new GetUserDto(p.Id, p.Name, p.LastName, p.Email, p.Password)),
            Administrators = administrators.Select(a => new GetUserDto(a.Id, a.Name, a.LastName, a.Email, a.Password))

        };

        return Ok();
        
    }

    [HttpGet("/students")]
    public async Task<ActionResult> GetStudentList()
    {
        var students = await _context.Users.OfType<Student>().ToListAsync();

        return Ok(students.Select(s => new GetUserDto(s.Id, s.Name, s.LastName, s.Email, s.Password, s.GroupId)));
    }
    
    [HttpGet("/professors")]
    public async Task<ActionResult> GetProfessorList()
    {
        var professors = await _context.Users.OfType<Professor>().ToListAsync();

        return Ok(professors.Select(p => new GetUserDto(p.Id, p.Name, p.LastName, p.Email, p.Password)));
    }
    
    [HttpGet("/administrator")]
    public async Task<ActionResult> GetAdministratorList()
    {
        var administrators = await _context.Users.OfType<Administrator>().ToListAsync();

        return Ok(administrators.Select(a => new GetUserDto(a.Id, a.Name, a.LastName, a.Email, a.Password)));
    }
    
}