using Microsoft.AspNetCore.Mvc;
using agenda_on_api_netcore.Entities;
using Microsoft.EntityFrameworkCore;
using agenda_on_api_netcore.Models.CalendarioDTO;

namespace agenda_on_api_netcore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarioController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpPost]
        public async Task<ActionResult<Calendario>> PostCalendario(CalendarioCreateModel model)
        {
            var calendario = new Calendario
            {
                DataHoraConfigurada = model.DataHoraConfigurada,
                GestorId = model.GestorId,
                ColaboradorId = model.ColaboradorId,
               
             };

            _context.Calendarios.Add(calendario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCalendario), new { id = calendario.CalendarioId }, null);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Calendario>> GetCalendario(int id)
        {
            var calendario = await _context.Calendarios.FindAsync(id);

            if (calendario == null)
            {
                return NotFound();
            }

            return calendario;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCalendario(int id, CalendarioUpdateModel model)
        {
            if (id != model.CalendarioId)
            {
                return BadRequest();
            }

            var calendario = await _context.Calendarios.FindAsync(id);
            if (calendario == null)
            {
                return NotFound();
            }

            calendario.CalendarioId = id;
            calendario.DataHoraConfigurada = model.DataHoraConfigurada;
            calendario.GestorId = model.GestorId;
            calendario.DataHoraConfigurada = model.DataHoraConfigurada;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Calendarios.Any(e => e.CalendarioId == id))
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
        public async Task<IActionResult> DeleteCalendario(int id)
        {
            var calendario = await _context.Calendarios.FindAsync(id);
            if (calendario == null)
            {
                return NotFound();
            }

            _context.Calendarios.Remove(calendario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
