namespace AkademineSistema.Dtos;

public record CreateSubjectDto(string title, string description);

public record GetSubjectDto(int id, string title, string description);

public record EditSubjectDto(string title, string description);