using BonaLiz.Negocio.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Identity.Interfaces
{
    public interface IIdentityService
    {
        Task<UsuarioResponseViewModel> Login(UsuarioViewModel usuarioLogin);
        Task<UsuarioResponseViewModel> CadastrarUsuario(UsuarioViewModel usuarioCadastro);
        Task EditarUsuario(UsuarioViewModel usuarioCadastro);
    }
}
