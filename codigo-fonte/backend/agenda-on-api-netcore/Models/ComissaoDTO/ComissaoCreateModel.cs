namespace agenda_on_api_netcore.Models.ComissaoDTO
{
    public class ComissaoCreateModel
    {
        public int ColaboradorId { get; set; }
        public int ServicoId { get; set; }
        public decimal Percentual { get; set; }
    }
}
