using Microsoft.AspNetCore.Identity;
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
        public bool Status => Erros.Count == 0;
        public List<string> Erros { get; private set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }

        public UsuarioResponseViewModel() =>
            Erros = new List<string>();

        public UsuarioResponseViewModel(bool status, string nome, string email, string role) : this()
        {
            Nome = nome;
            Email = email;
            Role = role;
        }

        public void AdicionarErro(string erro) =>
           Erros.Add(erro);
        public void AdicionarErros(IEnumerable<string> erros) =>
            Erros.AddRange(erros);
    }
}
