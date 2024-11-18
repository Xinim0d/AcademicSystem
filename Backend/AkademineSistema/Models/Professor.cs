namespace AkademineSistema.Models;

public class Professor : User
{
    public virtual List<Subject> Subjects { get; set; }
}