namespace agenda_on_api_netcore.Models.AgendamentoDTO
{
    public class AgendamentoUpdateModel
    {
        public int AgendamentoId { get; set; }
        public int ColaboradorId { get; set; }
        public int ClienteId { get; set; }
        public int CalendarioId { get; set; }
        public int StatusId { get; set; }
        public string Observacoes { get; set; }
        public DateTime DataHoraAgendamento { get; set; }
        public List<ServicoAgendamentoModel> Servicos { get; set; }
    }
}
