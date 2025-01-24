using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BonaLiz.Negocio.Services
{
    public class LoginServices : ILoginServices
    {
        private readonly IConfiguration _configuration;

        public LoginServices(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public bool Entrar(LoginViewModel model)
        {
            if (model.Usuario == "lizandra")
            {
                SHA256 sha256 = SHA256.Create();
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(model.Senha));

                StringBuilder sBuilder = new StringBuilder();

                for (int i = 0; i < bytes.Length; i++)
                {
                    sBuilder.Append(bytes[i].ToString("x2"));
                }
                var senha = _configuration.GetSection("Senha").Value;

                if (senha == sBuilder.ToString())
                    return true;

                return false;
            }
            return false;
        }
    }
}
