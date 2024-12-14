using System.ComponentModel.DataAnnotations;

namespace NoteAppAPI.DTO
{
    public class NoteDTO
    {
        [Required(ErrorMessage = "Başlık alanı gereklidir.")]
        [MaxLength(20, ErrorMessage = "Başlık alanı en fazla 20 karakter olabilir.")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "İçerik alanı gereklidir.")]
        [MaxLength(50, ErrorMessage = "İçerik alanı en fazla 50 karakter olabilir.")]
        public string Content { get; set; } = string.Empty;

        public string Color { get; set; } = "#ffffff";
        public bool IsFavorite { get; set; } = false;
    }
}
