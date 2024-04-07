namespace agenda_on_api_netcore.Entities
{
    public class ServicoAgendamento
    {
        public int ServicoAgendamentoId { get; set; }
        public int AgendamentoId { get; set; }
        public Agendamento Agendamento { get; set; }
        public int ServicoId { get; set; }
        public Servico Servico { get; set; }
        public int Quantidade { get; set; }
    }
}

