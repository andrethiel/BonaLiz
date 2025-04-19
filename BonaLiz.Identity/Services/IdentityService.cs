using BonaLiz.Identity.Interfaces;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace BonaLiz.Identity.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public IdentityService(SignInManager<IdentityUser> signInManager,
                               UserManager<IdentityUser> userManager,
                               RoleManager<IdentityRole> roleManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        public async Task<UsuarioResponseViewModel> CadastrarUsuario(UsuarioViewModel model)
        {
            var identityUser = new IdentityUser
            {
                UserName = model.NomeCompleto,
                Email = model.Email,
            };

            var result = await _userManager.CreateAsync(identityUser, model.Senha);

            if (result.Succeeded)
            {
                var role = await _roleManager.FindByIdAsync(model.Role);

                await _userManager.AddToRoleAsync(identityUser, role.Name);
                await _userManager.SetLockoutEnabledAsync(identityUser, false);
            }


            var usuario = new UsuarioResponseViewModel();
            if (!result.Succeeded && result.Errors.Count() > 0)
                usuario.AdicionarErros(result.Errors.Select(x => x.Description));

            return usuario;
        }

        public Task EditarUsuario(UsuarioViewModel usuarioCadastro)
        {
            throw new NotImplementedException();
        }

        public async Task<UsuarioResponseViewModel> Login(UsuarioViewModel model, HttpContext httpContext)
        {
            var usuario = new UsuarioResponseViewModel();
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                usuario.AdicionarErro("E-mail incorreto");
                return usuario;
            }
            var result = await _signInManager.PasswordSignInAsync(user.UserName, model.Senha, false, true);
            if (result.Succeeded)
            {
                return await GerarCookie(httpContext, user);
            }


            if (!result.Succeeded)
            {
                usuario.AdicionarErro("Usuário/senha estão incorretos");
            }
            return usuario;
        }

        private async Task<UsuarioResponseViewModel> GerarCookie(HttpContext httpContext, IdentityUser user)
        {
            var claims = new List<Claim>{
                    new Claim(System.Security.Claims.ClaimTypes.NameIdentifier, user.Id),
                    new Claim(System.Security.Claims.ClaimTypes.Name, user.UserName),
                    new Claim(System.Security.Claims.ClaimTypes.Email, user.Email)
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(System.Security.Claims.ClaimTypes.Role, role));
            }

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var authProperties = new AuthenticationProperties { IsPersistent = true };

            await httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);
            var roleId = await _roleManager.FindByNameAsync(claims[3].Value);
            return new UsuarioResponseViewModel
            (
                status: true,
                nome: user.UserName.Substring(0, 1),
                email: user.Email,
                role: roleId.Id
            );
        }
    }
}
