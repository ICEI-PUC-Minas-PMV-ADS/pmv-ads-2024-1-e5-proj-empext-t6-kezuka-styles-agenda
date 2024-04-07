namespace agenda_on_api_netcore.Models.AgendamentoDTO
{
    public class AgendamentoCreateModel
    {
        public int ColaboradorId { get; set; }
        public int ClienteId { get; set; }
        public int CalendarioId { get; set; }
        public int StatusId { get; set; }
        public string Observacoes { get; set; }
        public DateTime DataHoraAgendamento { get; set; }
        public List<ServicoAgendamentoModel> Servicos { get; set; }
    }

    public class ServicoAgendamentoModel
    {
        public int ServicoId { get; set; }
        public int Quantidade { get; set; }
    }
}
