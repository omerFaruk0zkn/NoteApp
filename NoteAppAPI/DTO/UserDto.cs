using System.ComponentModel.DataAnnotations;

namespace NoteAppAPI.DTO
{
    public class UserDto
    {
        [Required(ErrorMessage = "Kullanıcı adı gereklidir.")]
        public string Username { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Şifre gereklidir.")]
        public string Password { get; set; } = string.Empty;
    }
}
