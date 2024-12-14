using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteAppAPI.Data;
using NoteAppAPI.DTO;
using NoteAppAPI.Models;
using System.Security.Claims;

namespace NoteAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NotesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotes()
        {
            var userId = GetUserId();
            var notes = await _context.Notes.Where(n => n.UserId == userId).ToListAsync();
            return Ok(notes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNote(int id)
        {
            var userId = GetUserId();
            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);

            if (note == null)
                return NotFound("Not bulunamadı.");

            return Ok(note);
        }

        [HttpPost]
        public async Task<IActionResult> AddNote([FromBody] NoteDTO request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
                return BadRequest(new { Errors = errors });
            }

            var userId = GetUserId();

            var note = new Note
            {
                Title = request.Title,
                Content = request.Content,
                Color = request.Color,
                IsFavorite = request.IsFavorite,
                UserId = userId
            };

            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return Ok(note);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNote(int id, [FromBody] NoteDTO request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
                return BadRequest(new { Errors = errors });
            }

            var userId = GetUserId();
            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);

            if (note == null)
                return NotFound("Not bulunamadı.");
            
            note.Title = request.Title;
            note.Content = request.Content;
            note.Color = request.Color;
            note.IsFavorite = request.IsFavorite;

            await _context.SaveChangesAsync();

            return Ok(note);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var userId = GetUserId();
            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);

            if (note == null)
                return NotFound("Not bulunamadı.");

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return Ok("Not silindi");
        }

        private int GetUserId()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            return userId;
        }
    }
}
