using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Identity.Interfaces
{
    public interface IIdentityService
    {
        Task<UsuarioResponseViewModel> Login(UsuarioViewModel usuarioLogin, HttpContext httpContext);
        Task<UsuarioResponseViewModel> CadastrarUsuario(UsuarioViewModel usuarioCadastro);
        Task EditarUsuario(UsuarioViewModel usuarioCadastro);
    }
}
