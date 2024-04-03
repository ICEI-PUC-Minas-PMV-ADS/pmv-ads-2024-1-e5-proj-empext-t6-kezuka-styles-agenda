using System.Globalization;

namespace agenda_on_api_netcore.Entities
{
    public class Gestor {
        public int GestorId { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Celular { get; set; }
        public DateTime DataCadastro { get; set; }

        public ICollection<Calendario> Calendarios { get; set; }
    }

}
