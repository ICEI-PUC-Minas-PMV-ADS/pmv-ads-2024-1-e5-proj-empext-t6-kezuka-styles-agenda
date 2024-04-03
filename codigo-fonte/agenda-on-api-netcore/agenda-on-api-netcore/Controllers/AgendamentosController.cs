using Microsoft.AspNetCore.Mvc;
using agenda_on_api_netcore.Entities;
using Microsoft.EntityFrameworkCore;
using agenda_on_api_netcore.Models.AgendamentoDTO;

namespace agenda_on_api_netcore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgendamentosController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpPost]
        public async Task<ActionResult<Servico>> PostAgendamento(AgendamentoCreateModel model)
        {
            var agendamento = new Agendamento
            {
                ColaboradorId = model.ColaboradorId,
                ClienteId = model.ClienteId,
                CalendarioId = model.CalendarioId,
                StatusId = model.StatusId,
                Observacoes = model.Observacoes,
                DataHoraAgendamento = model.DataHoraAgendamento,

                ServicoAgendamentos = model.Servicos.Select(s => new ServicoAgendamento
                {
                    ServicoId = s.ServicoId,
                    Quantidade = s.Quantidade

                }).ToList()
            };

            _context.Agendamentos.Add(agendamento);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAgendamento), new { id = agendamento.AgendamentoId }, null);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetAgendamento(int id)
        {
            var agendamento = await _context.Agendamentos
                .Where(a => a.AgendamentoId == id)
                .Select(a => new
                {
                    a.AgendamentoId,
                    ColaboradorNome = a.Colaborador.Nome,
                    a.ColaboradorId,
                    ClienteNome = a.Cliente.Nome,
                    a.ClienteId,
                    a.CalendarioId,
                    StatusDescricao = a.StatusAtendimento.Descricao,
                    a.Observacoes,
                    a.DataHoraAgendamento,
                    
                })
                .FirstOrDefaultAsync();

            if (agendamento == null)
            {
                return NotFound();
            }

            return Ok(agendamento);
        }

        [HttpGet("colaborador/{colaboradorId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetAgendamentosPorColaborador(int colaboradorId)
        {
            var agendamentos = await _context.Agendamentos
                .Where(a => a.ColaboradorId == colaboradorId)
                .Select(a => new
                {
                    a.AgendamentoId,
                    ColaboradorNome = a.Colaborador.Nome,
                    a.ColaboradorId,
                    ClienteNome = a.Cliente.Nome,
                    a.ClienteId,
                    a.CalendarioId,
                    StatusDescricao = a.StatusAtendimento.Descricao,
                    a.Observacoes,
                    a.DataHoraAgendamento,

                })
                .ToListAsync();

            if (agendamentos == null || agendamentos.Count == 0)
            {
                return NotFound("Nenhum agendamento encontrado para o colaborador especificado.");
            }

            return Ok(agendamentos);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAgendamento(int id, AgendamentoUpdateModel model)
        {
            if (id != model.AgendamentoId)
            {
                return BadRequest();
            }

            var agendamento = await _context.Agendamentos
                .Include(a => a.ServicoAgendamentos)
                .FirstOrDefaultAsync(a => a.AgendamentoId == id);

            if (agendamento == null)
            {
                return NotFound();
            }

            agendamento.ColaboradorId = model.ColaboradorId;
            agendamento.ClienteId = model.ClienteId;
            agendamento.CalendarioId = model.CalendarioId;
            agendamento.StatusId = model.StatusId;
            agendamento.Observacoes = model.Observacoes;
            agendamento.DataHoraAgendamento = model.DataHoraAgendamento;

            // Atualizando os serviços do agendamento
            // Primeiro, remova os existentes
            _context.ServicoAgendamentos.RemoveRange(agendamento.ServicoAgendamentos);

            // Depois, adicione os novos serviços fornecidos no modelo de atualização
            foreach (var servicoModel in model.Servicos)
            {
                agendamento.ServicoAgendamentos.Add(new ServicoAgendamento
                {
                    AgendamentoId = id,
                    ServicoId = servicoModel.ServicoId,
                    Quantidade = servicoModel.Quantidade
                });
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Agendamentos.Any(e => e.AgendamentoId == id))
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
        public async Task<IActionResult> DeleteAgendamento(int id)
        {
            var agendamento = await _context.Agendamentos.FindAsync(id);
            if (agendamento == null)
            {
                return NotFound();
            }

            _context.Agendamentos.Remove(agendamento);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
