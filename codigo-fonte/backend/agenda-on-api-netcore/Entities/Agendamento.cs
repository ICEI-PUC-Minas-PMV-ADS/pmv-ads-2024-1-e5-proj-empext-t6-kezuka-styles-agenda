namespace agenda_on_api_netcore.Entities
{
    public class Agendamento
    {
        public int AgendamentoId { get; set; }
        public int ColaboradorId { get; set; }
        public Colaborador Colaborador { get; set; }
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }
        public int? CalendarioId { get; set; }
        public Calendario Calendario { get; set; }
        public int StatusId { get; set; }
        public StatusAtendimento StatusAtendimento { get; set; }
        public string Observacoes { get; set; }
        public DateTime DataHoraAgendamento { get; set; }

        public ICollection<ServicoAgendamento> ServicoAgendamentos { get; set; }
    }
}
