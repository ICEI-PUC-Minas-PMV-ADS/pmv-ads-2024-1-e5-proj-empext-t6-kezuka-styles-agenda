using Microsoft.AspNetCore.Mvc;
using agenda_on_api_netcore.Entities;
using Microsoft.EntityFrameworkCore;
using agenda_on_api_netcore.Models.ColaboradorDTO;

namespace agenda_on_api_netcore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColaboradoresController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpPost]
        public async Task<ActionResult<Colaborador>> PostColaborador(ColaboradorCreateModel model)
        {
            var colaborador = new Colaborador
            {
                Nome = model.Nome,
                Email = model.Email,
                Senha = model.Senha, 
                Celular = model.Celular,
                DataNascimento = model.DataNascimento,
                DataCadastro = DateTime.UtcNow
            };

            _context.Colaboradores.Add(colaborador);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(PostColaborador), new { id = colaborador.ColaboradorId }, null);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Colaborador>> GetColaborador(int id)
        {
            var colaborador = await _context.Colaboradores.FindAsync(id);

            if (colaborador == null)
            {
                return NotFound();
            }

            return colaborador;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutColaborador(int id, ColaboradorUpdateModel model)
        {
            if (id != model.ColaboradorId)
            {
                return BadRequest();
            }

            var colaborador = await _context.Colaboradores.FindAsync(id);
            if (colaborador == null)
            {
                return NotFound();
            }

            colaborador.Nome = model.Nome;
            colaborador.Email = model.Email;
            colaborador.Senha = model.Senha;
            colaborador.Celular = model.Celular;
            colaborador.DataNascimento = model.DataNascimento;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Colaboradores.Any(e => e.ColaboradorId == id))
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
        public async Task<IActionResult> DeleteColaborador(int id)
        {
            var colaborador = await _context.Colaboradores.FindAsync(id);
            if (colaborador == null)
            {
                return NotFound();
            }

            _context.Colaboradores.Remove(colaborador);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
