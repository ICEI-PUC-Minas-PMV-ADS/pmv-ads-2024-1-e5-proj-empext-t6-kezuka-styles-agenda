namespace agenda_on_api_netcore.Models.CalendarioDTO
{
    public class CalendarioCreateModel
    {
        public DateTime DataHoraConfigurada { get; set; }
        public int? GestorId { get; set; }
        public int? ColaboradorId { get; set; }
    }
}
