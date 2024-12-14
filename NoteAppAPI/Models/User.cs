using System.ComponentModel.DataAnnotations;

namespace NoteAppAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Kullanıcı adı gereklidir.")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Şifre gereklidir.")]
        public string PasswordHash { get; set; } = string.Empty;

        public ICollection<Note>? Notes { get; set; }
    }
}
