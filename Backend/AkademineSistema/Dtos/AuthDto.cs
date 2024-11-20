using System.ComponentModel.DataAnnotations;

namespace AkademineSistema.Dtos;

public record LoginAuthDto(string username, string password);
public record ErrorDto(string Message);
public record LoginResponseDto(int id, string role);