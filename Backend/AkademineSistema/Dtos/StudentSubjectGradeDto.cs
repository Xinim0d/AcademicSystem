namespace AkademineSistema.Dtos;

public record CreateStudentSubjectGradeDto(string title, int value, int studentId, int subjectId);

public record GetStudentSubjectGradeDto(int id, string title, int value, int studentId, int subjectId);

public record EditStudentSubjectGradeDto(string title, int value, int studentId, int subjectId);