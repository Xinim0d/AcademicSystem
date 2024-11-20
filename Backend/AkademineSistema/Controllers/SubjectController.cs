using AkademineSistema.Dtos;
using AkademineSistema.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AkademineSistema.Controllers;


[ApiController]
[Route("Subjects")]
public class SubjectController : ControllerBase
{
    private readonly AcademicSystemDbContext _context;
    
    public SubjectController(AcademicSystemDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<GetSubjectDto>> Create(CreateSubjectDto createSubjectDto)
    {
        var newSubject = new Subject
        {
            Title = createSubjectDto.title,
            Description = createSubjectDto.description
        };

        _context.Subjects.Add(newSubject);
        await _context.SaveChangesAsync();

        return Created("", new GetSubjectDto(newSubject.Id, newSubject.Title, newSubject.Description));

    }
    
    
    [HttpGet]
    public async Task<ActionResult> GetSubjectList()
    {
        var subjects = await _context.Subjects.ToListAsync();

        return Ok(subjects.Select(s => new GetSubjectDto(s.Id, s.Title, s.Description)));
    }

    [HttpPut("{subjectId}")]
    public async Task<ActionResult<GetSubjectDto>> EditSubjectList(int subjectId, EditSubjectDto editSubjectDto)
    {
        var firstSubject = await _context.Subjects.FirstOrDefaultAsync(s => s.Id == subjectId);

        if (firstSubject == null)
            return NotFound();

        firstSubject.Title = editSubjectDto.title;
        firstSubject.Description = editSubjectDto.description;
        await _context.SaveChangesAsync();

        return new GetSubjectDto(firstSubject.Id, firstSubject.Title, firstSubject.Description);
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteSubjectDto(int subjectId)
    {
        var firstSubject = await _context.Subjects.FirstOrDefaultAsync(s => s.Id == subjectId);

        if (firstSubject == null)
            return NotFound();

        _context.Subjects.Remove(firstSubject);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    
    
}