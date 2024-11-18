using AkademineSistema.Dtos;
using AkademineSistema.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AkademineSistema.Controllers;


[ApiController]
[Route("Groups")]
public class GroupController : ControllerBase
{
    private readonly AcademicSystemDbContext _context;
    
    public GroupController(AcademicSystemDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<GetGroupDto>> Create(CreateGroupDto createGroupDto)
    {
        var newGroup = new Group()
        {
            Title = createGroupDto.title,
            Year = createGroupDto.year
        };

        _context.Groups.Add(newGroup);
        await _context.SaveChangesAsync();

        return Created("", new GetGroupDto(newGroup.Id, newGroup.Title, newGroup.Year));
    }

    [HttpGet]
    public async Task<ActionResult> GetGroupList()
    {
        var groups = await _context.Groups.ToListAsync();

        return Ok(groups.Select(g => new GetGroupDto(g.Id, g.Title, g.Year)));
    }

    [HttpPut("{groupId}")]
    public async Task<ActionResult<GetGroupDto>> EditGroupList(int groupId, EditGroupDto editGroupDto)
    {
        var firstGroup = await _context.Groups.FirstOrDefaultAsync(g => g.Id == groupId);

        if (firstGroup == null)
            return NotFound();

        firstGroup.Title = editGroupDto.title;
        firstGroup.Year = editGroupDto.year;
        await _context.SaveChangesAsync();

        return new GetGroupDto(firstGroup.Id, firstGroup.Title, firstGroup.Year);
    }

    [HttpDelete("{groupId}")]
    public async Task<ActionResult> DeleteGroupDto(int groupId)
    {
        var firstGroup = await _context.Groups.FirstOrDefaultAsync(g => g.Id == groupId);

        if (firstGroup == null)
            return NotFound();

        _context.Groups.Remove(firstGroup);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}