namespace agenda_on_api_netcore.Entities
{
    public class Calendario
    {
        public int CalendarioId { get; set; }
        public DateTime DataHoraConfigurada { get; set; }
        public int? GestorId { get; set; }
        public Gestor Gestor { get; set; }
        public int? ColaboradorId { get; set; }
        public Colaborador Colaborador { get; set; }
        public ICollection<Agendamento> Agendamentos { get; set; }
    }
}
