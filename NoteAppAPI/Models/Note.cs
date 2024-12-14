using System.ComponentModel.DataAnnotations;

namespace NoteAppAPI.Models
{
    public class Note
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Başlık alanı gereklidir.")]
        [MaxLength(20, ErrorMessage = "Başlık alanı en fazla 20 karakter olabilir.")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "İçerik alanı gereklidir.")]
        [MaxLength(50, ErrorMessage = "İçerik alanı en fazla 50 karakter olabilir.")]
        public string Content { get; set; } = string.Empty;

        public string Color { get; set; } = "#ffffff";
        public bool IsFavorite { get; set; } = false;

        [Required]
        public int UserId { get; set; }

        public User? User { get; set; }
    }
}
