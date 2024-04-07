using Microsoft.AspNetCore.Mvc;
using agenda_on_api_netcore.Entities;
using Microsoft.EntityFrameworkCore;
using agenda_on_api_netcore.Models.ServicoDTO;

namespace agenda_on_api_netcore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicosController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpPost]
        public async Task<ActionResult<Servico>> PostServico(ServicoCreateModel model)
        {
            var servico = new Servico
            {
                Nome = model.Nome,
                Valor = model.Valor,
            };

            _context.Servicos.Add(servico);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetServico), new { id = servico.ServicoId }, null);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Servico>> GetServico(int id)
        {
            var servico = await _context.Servicos.FindAsync(id);

            if (servico == null)
            {
                return NotFound();
            }

            return servico;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutServico(int id, ServicoUpdateModel model)
        {
            if (id != model.ServicoId)
            {
                return BadRequest();
            }

            var servico = await _context.Servicos.FindAsync(id);
            if (servico == null)
            {
                return NotFound();
            }

            servico.Nome = model.Nome;
            servico.Valor = model.Valor;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Servicos.Any(e => e.ServicoId == id))
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
        public async Task<IActionResult> DeleteServico(int id)
        {
            var servico = await _context.Servicos.FindAsync(id);
            if (servico == null)
            {
                return NotFound();
            }

            _context.Servicos.Remove(servico);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
