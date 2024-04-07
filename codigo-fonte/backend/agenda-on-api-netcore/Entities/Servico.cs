namespace agenda_on_api_netcore.Entities
{
    public class Servico
    {
        public int ServicoId { get; set; }
        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public ICollection<ServicoAgendamento> ServicoAgendamentos { get; set; }
        public ICollection<Comissao> Comissoes { get; set; }

    }

}
