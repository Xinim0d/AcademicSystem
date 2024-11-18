using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AkademineSistema.Models;

public class Group
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public  int Id { get; set; }
    public required string Title { get; set; }
    public required int Year { get; set; }
    
    public virtual List<Student> Students { get; set; }
}