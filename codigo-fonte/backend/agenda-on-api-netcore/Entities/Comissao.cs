namespace agenda_on_api_netcore.Entities
{
    public class Comissao
    {
        public int ComissaoId { get; set; }
        public int ColaboradorId { get; set; }
        public Colaborador Colaborador { get; set; }
        public int? ServicoId { get; set; }
        public Servico Servico { get; set; }
        public decimal Percentual { get; set; }
    }
}
