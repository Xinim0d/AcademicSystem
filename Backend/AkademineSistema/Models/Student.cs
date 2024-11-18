using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AkademineSistema.Models;

public class Student : User,  IEntityTypeConfiguration<Student>
{
    public int GroupId { get; set; }
    public virtual Group Group { get; set; }
    
    public virtual List<StudentSubjectGrade> StudentSubjectGrades { get; set; }
    
    public virtual List<Subject> Subjects { get; set; }
    
    public void Configure(EntityTypeBuilder<Student> builder)
    {
        builder.HasMany(m => m.Subjects)
            .WithMany(m => m.Students);

        builder.HasMany(m => m.StudentSubjectGrades)
            .WithOne(m => m.Student)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(m => m.Group)
            .WithMany(m => m.Students);
    }
}