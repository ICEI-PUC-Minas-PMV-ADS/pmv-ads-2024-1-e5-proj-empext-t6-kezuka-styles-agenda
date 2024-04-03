using Microsoft.AspNetCore.Mvc;
using agenda_on_api_netcore.Entities;
using Microsoft.EntityFrameworkCore;
using agenda_on_api_netcore.Models.ComissaoDTO;

namespace agenda_on_api_netcore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComissoesController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpPost]
        public async Task<ActionResult<Comissao>> PostComissao(ComissaoCreateModel model)
        {
            var comissao = new Comissao
            {
                ColaboradorId = model.ColaboradorId,
                ServicoId = model.ServicoId,
                Percentual = model.Percentual,
            };

            _context.Comissoes.Add(comissao);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetComissao), new { id = comissao.ComissaoId }, null);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Comissao>> GetComissao(int id)
        {
            var comissao = await _context.Comissoes.FindAsync(id);

            if (comissao == null)
            {
                return NotFound();
            }

            return comissao;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutComissao(int id, ComissaoUpdateModel model)
        {
            if (id != model.ServicoId)
            {
                return BadRequest();
            }

            var comissao = await _context.Comissoes.FindAsync(id);
            if (comissao == null)
            {
                return NotFound();
            }

            comissao.ColaboradorId = model.ColaboradorId;
            comissao.ServicoId = model.ServicoId;
            comissao.Percentual = model.Percentual;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Comissoes.Any(e => e.ComissaoId == id))
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
        public async Task<IActionResult> DeleteComissao(int id)
        {
            var comissao = await _context.Comissoes.FindAsync(id);
            if (comissao == null)
            {
                return NotFound();
            }

            _context.Comissoes.Remove(comissao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
