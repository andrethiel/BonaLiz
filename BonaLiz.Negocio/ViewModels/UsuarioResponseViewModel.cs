using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.ViewModels
{
    public class UsuarioResponseViewModel
    {
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string AccessToken { get; private set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string RefreshToken { get; private set; }
        public bool Status => Erros.Count == 0;
        public List<string> Erros { get; private set; }
        public string ValidoAte { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }

        public UsuarioResponseViewModel() =>
            Erros = new List<string>();

        public UsuarioResponseViewModel(bool status, string accessToken, string refreshToken, string validoAte, string nome, string email) : this()
        {
            AccessToken = accessToken;
            RefreshToken = refreshToken;
            ValidoAte = validoAte;
            Nome = nome;
            Email = email;
        }

        public void AdicionarErro(string erro) =>
           Erros.Add(erro);
        public void AdicionarErros(IEnumerable<string> erros) =>
            Erros.AddRange(erros);
    }
}
