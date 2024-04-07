using System.Globalization;

namespace agenda_on_api_netcore.Entities
{
    public class Colaborador
    {
        public int ColaboradorId { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Celular { get; set; }
        public DateTime DataNascimento { get; set; }
        public DateTime DataCadastro { get; set; }

        public ICollection<Agendamento> Agendamentos { get; set; }
        public ICollection<Calendario> Calendarios { get; set; }
        public ICollection<Comissao> Comissoes { get; set; }

    }

}
