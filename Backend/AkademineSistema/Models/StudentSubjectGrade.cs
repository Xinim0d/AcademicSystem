using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AkademineSistema.Models;

public class StudentSubjectGrade
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public  int Id { get; set; }
    public required string Title { get; set; }
    public required int Value { get; set; }
    
    public int StudentId { get; set; }
    
    public int SubjectId { get; set; }
    public virtual Student Student { get; set; }
    
}