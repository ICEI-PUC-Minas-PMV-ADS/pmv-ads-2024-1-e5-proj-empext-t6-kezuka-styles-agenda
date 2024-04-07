namespace agenda_on_api_netcore.Models.ComissaoDTO
{
    public class ComissaoUpdateModel
    {
        public int ComissaoId { get; set; }
        public int ColaboradorId { get; set; }
        public int ServicoId { get; set; }
        public decimal Percentual { get; set; }
    }
}
