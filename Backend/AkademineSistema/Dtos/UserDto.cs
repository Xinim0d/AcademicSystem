namespace AkademineSistema.Dtos;

public record CreateUserDto(string name, string lastName, string email, string password, string role, int? groupId = null);

public record GetUserDto(int id, string name, string lastName, string email, string password, int? groupId = null);