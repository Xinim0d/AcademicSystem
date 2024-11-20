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
        var emailParts = createUserDto.email.Split('@')[0].Split('.');
        if (emailParts.Length < 2)
        {
            return BadRequest(new ErrorDto("Invalid email format"));
        }

        var name = emailParts[0];
        var lastname = emailParts[1];
        
        if (createUserDto.role.ToLower() == "student")
        {
            var newStudent = new Student()
            {
                Name = name,
                LastName = lastname,
                Email = createUserDto.email,
                Password = lastname,
                GroupId = createUserDto.groupId!.Value
            };

            _context.Users.Add(newStudent);
            await _context.SaveChangesAsync();

            return Created("",
                new GetUserDto(newStudent.Id, newStudent.Name, newStudent.LastName, newStudent.Email,  newStudent.Password, newStudent.GroupId));
        }

        var newProfessor = new Professor()
        {
            Name = name,
            LastName = lastname,
            Email = createUserDto.email,
            Password = lastname
        };

        _context.Users.Add(newProfessor);
        await _context.SaveChangesAsync();

        return Created("",
            new GetUserDto(newProfessor.Id, newProfessor.Name, newProfessor.LastName, newProfessor.Email, newProfessor.Password));

    }
    
    [HttpPost("assign-subject-to-professor")]
    public async Task<ActionResult> AssignSubjectToProfessor(AssignSubjectToProfessorDto assignSubjectDto)
    {
        var professor = await _context.Users.OfType<Professor>()
            .Include(p => p.Subjects)
            .FirstOrDefaultAsync(p => p.Id == assignSubjectDto.professorId);

        if (professor == null)
        {
            return NotFound(new ErrorDto("Professor not found"));
        }

        var subject = await _context.Subjects.FirstOrDefaultAsync(s => s.Id == assignSubjectDto.subjectId);
        if (subject == null)
        {
            return NotFound(new ErrorDto("Subject not found"));
        }

        professor.Subjects.Add(subject);
        await _context.SaveChangesAsync();

        return Ok();
    }
    
    [HttpPost("/assign-subject-to-student")]
    public async Task<ActionResult> AssignSubjectToStudent(AssignSubjectsToStudentDto assignSubjectSDto)
    {
        var student = await _context.Users.OfType<Student>()
            .Include(p => p.Subjects)
            .FirstOrDefaultAsync(p => p.Id == assignSubjectSDto.studentId);

        if (student == null)
        {
            return NotFound(new ErrorDto("Student not found"));
        }

        var subject = await _context.Subjects.FirstOrDefaultAsync(s => s.Id == assignSubjectSDto.subjectId);
        if (subject == null)
        {
            return NotFound(new ErrorDto("Subject not found"));
        }

        student.Subjects.Add(subject);
        await _context.SaveChangesAsync();

        return Ok();
    }
    
    [HttpGet("/professor/{professorId}/subjects")]
    public async Task<ActionResult<IEnumerable<GetSubjectDto>>> SubjectToProfessorDto(int professorId)
    {
        var professor = await _context.Users.OfType<Professor>()
            .Include(p => p.Subjects)
            .FirstOrDefaultAsync(p => p.Id == professorId);

        if (professor == null)
        {
            return NotFound(new ErrorDto("Professor not found"));
        }

        var subjects = professor.Subjects.Select(s => new GetSubjectDto(s.Id, s.Title, s.Description)).ToList();

        return Ok(subjects);
    }
    
    [HttpGet("/student/{studentId}/subjects")]
    public async Task<ActionResult<IEnumerable<GetSubjectDto>>> SubjectToStudentDto(int studentId)
    {
        var student = await _context.Users.OfType<Student>()
            .Include(s => s.Subjects)
            .FirstOrDefaultAsync(s => s.Id == studentId);

        if (student == null)
        {
            return NotFound(new ErrorDto("Professor not found"));
        }

        var subjects = student.Subjects.Select(s => new GetSubjectDto(s.Id, s.Title, s.Description)).ToList();

        return Ok(subjects);
    }
    

    [HttpGet]
    public async Task<ActionResult> GetUserList()
    {
        
        var students = await _context.Users.OfType<Student>().ToListAsync();

        var professors = await _context.Users.OfType<Professor>().ToListAsync();
        
        var administrators = await _context.Users.OfType<Administrator>().ToListAsync();

        var result = new
        {
            Students = students.Select(u => new GetUserDto(u.Id, u.Name, u.LastName, u.Email, u.Password, u.GroupId)),
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
    
    [HttpDelete("students/{id}")]
    public async Task<ActionResult> DeleteStudent(int id)
    {
        var student = await _context.Users.OfType<Student>().FirstOrDefaultAsync(s => s.Id == id);
        if (student == null)
        {
            return NotFound(new ErrorDto("Student not found"));
        }

        _context.Users.Remove(student);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    
    [HttpDelete("professors/{id}")]
    public async Task<ActionResult> DeleteProfessor(int id)
    {
        var professor = await _context.Users.OfType<Professor>().FirstOrDefaultAsync(p => p.Id == id);
        if (professor == null)
        {
            return NotFound(new ErrorDto("Professor not found"));
        }

        _context.Users.Remove(professor);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    
}