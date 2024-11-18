using AkademineSistema.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AkademineSistema;

public class AcademicSystemDbContext : IdentityDbContext
{
    public AcademicSystemDbContext(DbContextOptions options) : base(options)
    {
    }

    protected AcademicSystemDbContext()
    {
    }

    public virtual DbSet<Subject> Subjects { get; set; } = null;
    public virtual DbSet<Group> Groups { get; set; } = null;
    public virtual DbSet<StudentSubjectGrade> StudentSubjectGrades { get; set; } = null;
    public virtual DbSet<User> Users { get; set; } = null;
    
}
