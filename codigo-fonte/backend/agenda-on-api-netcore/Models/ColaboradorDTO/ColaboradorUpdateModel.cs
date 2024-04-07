namespace agenda_on_api_netcore.Models.ColaboradorDTO;

public class ColaboradorUpdateModel
{
    public int ColaboradorId { get; set; }
    public string Nome { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; }
    public string Celular { get; set; }
    public DateTime DataNascimento { get; set; }
    public DateTime DataCadastro { get; set; }
}
