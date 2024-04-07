using Microsoft.AspNetCore.Mvc;
using agenda_on_api_netcore.Entities;
using Microsoft.EntityFrameworkCore;
using agenda_on_api_netcore.Models.GestorDTO;

namespace agenda_on_api_netcore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GestoresController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpPost]
        public async Task<ActionResult<Gestor>> PostGestor(GestorCreateModel model)
        {
            var gestor = new Gestor
            {
                Nome = model.Nome,
                Email = model.Email,
                Senha = model.Senha, 
                Celular = model.Celular,
                DataCadastro = DateTime.UtcNow
            };

            _context.Gestores.Add(gestor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGestor), new { id = gestor.GestorId }, null);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Gestor>> GetGestor(int id)
        {
            var gestor = await _context.Gestores.FindAsync(id);

            if (gestor == null)
            {
                return NotFound();
            }

            return gestor;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutGestor(int id, GestorUpdateModel model)
        {
            if (id != model.GestorId)
            {
                return BadRequest();
            }

            var gestor = await _context.Gestores.FindAsync(id);
            if (gestor == null)
            {
                return NotFound();
            }

            gestor.Nome = model.Nome;
            gestor.Email = model.Email;
            gestor.Senha = model.Senha;
            gestor.Celular = model.Celular;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Gestores.Any(e => e.GestorId == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGestor(int id)
        {
            var gestor = await _context.Gestores.FindAsync(id);
            if (gestor == null)
            {
                return NotFound();
            }

            _context.Gestores.Remove(gestor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
