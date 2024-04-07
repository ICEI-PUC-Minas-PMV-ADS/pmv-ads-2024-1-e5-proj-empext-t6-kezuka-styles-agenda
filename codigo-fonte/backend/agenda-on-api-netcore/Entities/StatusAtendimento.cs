namespace agenda_on_api_netcore.Entities
{
    public class StatusAtendimento
    {
        public int StatusId { get; set; }
        public string Descricao { get; set; }

        public ICollection<Agendamento> Agendamentos { get; set; }
    }
}
