namespace AkademineSistema.Dtos;

public record CreateGroupDto(string title, int year);

public record GetGroupDto(int id, string title, int year);

public record EditGroupDto(string title, int year);

