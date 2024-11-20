namespace AkademineSistema.Dtos;

public record CreateUserDto(string email, string role, int? groupId = null);

public record GetUserDto(int id, string name, string lastName, string email, string password, int? groupId = null);

public record AssignSubjectToProfessorDto(int professorId, int subjectId);

public record AssignSubjectsToStudentDto(int studentId, int subjectId);

public record SubjectToProfessorDto(int id, string title, string description);
public record SubjectToStudentDto(int id, string title, string description);