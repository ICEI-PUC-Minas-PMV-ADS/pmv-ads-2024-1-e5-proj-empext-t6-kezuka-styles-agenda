using Microsoft.AspNetCore.Mvc;
using agenda_on_api_netcore.Entities;
using Microsoft.EntityFrameworkCore;
using agenda_on_api_netcore.Models.StatusAtendimentoDTO;

namespace agenda_on_api_netcore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusAtendimentoController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpPost]
        public async Task<ActionResult<StatusAtendimento>> PostCliente(StatusAtendimentoCreateModel model)
        {
            var statusAtendimento = new StatusAtendimento
            {
                Descricao = model.Descricao,
            };

            _context.StatusAtendimentos.Add(statusAtendimento);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStatusAtendimento), new { id = statusAtendimento.StatusId }, null);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StatusAtendimento>> GetStatusAtendimento(int id)
        {
            var statusAtendimento = await _context.StatusAtendimentos.FindAsync(id);

            if (statusAtendimento == null)
            {
                return NotFound();
            }

            return statusAtendimento;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCliente(int id, StatusAtendimentoUpdateModel model)
        {
            if (id != model.StatusId)
            {
                return BadRequest();
            }

            var statusAtendimento = await _context.StatusAtendimentos.FindAsync(id);
            if (statusAtendimento == null)
            {
                return NotFound();
            }

            statusAtendimento.Descricao = model.Descricao;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.StatusAtendimentos.Any(e => e.StatusId == id))
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
        public async Task<IActionResult> DeleteStatusAtendimento(int id)
        {
            var statusAtendimento = await _context.StatusAtendimentos.FindAsync(id);
            if (statusAtendimento == null)
            {
                return NotFound();
            }

            _context.StatusAtendimentos.Remove(statusAtendimento);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
