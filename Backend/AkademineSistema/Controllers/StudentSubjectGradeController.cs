using AkademineSistema.Dtos;
using AkademineSistema.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AkademineSistema.Controllers;

[ApiController]
[Route("StudentSubjectGrades")]
public class StudentSubjectGradeController : ControllerBase
{
    private readonly AcademicSystemDbContext _context;

    public StudentSubjectGradeController(AcademicSystemDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<GetStudentSubjectGradeDto>> Create(
        CreateStudentSubjectGradeDto createStudentSubjectGradeDto)
    {
        var newStudentSubjectGrade = new StudentSubjectGrade()
        {
            Title = createStudentSubjectGradeDto.title,
            Value = createStudentSubjectGradeDto.value,
            StudentId = createStudentSubjectGradeDto.studentId,
            SubjectId = createStudentSubjectGradeDto.subjectId
        };

        _context.StudentSubjectGrades.Add(newStudentSubjectGrade);
        await _context.SaveChangesAsync();

        return Created("",
            new GetStudentSubjectGradeDto(newStudentSubjectGrade.Id, newStudentSubjectGrade.Title,
                newStudentSubjectGrade.Value, newStudentSubjectGrade.StudentId, newStudentSubjectGrade.SubjectId));
    }

    [HttpGet]
    public async Task<ActionResult> GetStudentSubjectGradeList()
    {
        var studentSubjectGrades = await _context.StudentSubjectGrades.ToListAsync();

        return Ok(studentSubjectGrades.Select(ssg => new GetStudentSubjectGradeDto(ssg.Id, ssg.Title, ssg.Value, ssg.StudentId, ssg.SubjectId)));
    }

    [HttpPut("{studentSubjectGradeId}")]
    public async Task<ActionResult<GetStudentSubjectGradeDto>> EditStudentSubjectGradeList(int studentSubjectGradeId,
        EditStudentSubjectGradeDto editStudentSubjectGradeDto)
    {
        var firstStudentSubjectGrade =
            await _context.StudentSubjectGrades.FirstOrDefaultAsync(ssg => ssg.Id == studentSubjectGradeId);

        if (firstStudentSubjectGrade == null)
            return NotFound();
        
        firstStudentSubjectGrade.Value = editStudentSubjectGradeDto.value;
        await _context.SaveChangesAsync();

        return new GetStudentSubjectGradeDto(firstStudentSubjectGrade.Id, firstStudentSubjectGrade.Title, firstStudentSubjectGrade.Value,
            firstStudentSubjectGrade.StudentId, firstStudentSubjectGrade.SubjectId );

    }

    [HttpDelete("{studentSubjectGradeId}")]
    public async Task<ActionResult> DeleteStudentSubjectGradeDto(int studentSubjectGradeId)
    {
        var firstStudentSubjectGrade =
            await _context.StudentSubjectGrades.FirstOrDefaultAsync(ssg => ssg.Id == studentSubjectGradeId);
        if (firstStudentSubjectGrade == null)
            return NotFound();

        _context.StudentSubjectGrades.Remove((firstStudentSubjectGrade));
        await _context.SaveChangesAsync();

        return NoContent();
    }

}