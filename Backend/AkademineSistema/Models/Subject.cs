using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AkademineSistema.Models;

public class Subject
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public  int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    
    public virtual List<Student> Students { get; set; }
    
    public virtual List<StudentSubjectGrade> StudentSubjectGrades { get; set; }
    
    public virtual List<Professor> Professors { get; set; }
}