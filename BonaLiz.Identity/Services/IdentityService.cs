using BonaLiz.Identity.Configuration;
using BonaLiz.Identity.Interfaces;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Identity.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JwtOptions _jwtOptions;

        public IdentityService(SignInManager<IdentityUser> signInManager,
                               UserManager<IdentityUser> userManager,
                               IOptions<JwtOptions> jwtOptions,
                               RoleManager<IdentityRole> roleManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _jwtOptions = jwtOptions.Value;
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

        //private async Task<UsuarioResponseViewModel> GerarCredenciais(IdentityUser user)
        //{
        //    var accessTokenClaims = await ObterClaims(user, adicionarClaimsUsuario: true);
        //    var refreshTokenClaims = await ObterClaims(user, adicionarClaimsUsuario: false);

        //    var dataExpiracaoAccessToken = DateTime.Now.AddMinutes(_jwtOptions.AccessTokenExpiration);
        //    var dataExpiracaoRefreshToken = DateTime.Now.AddDays(_jwtOptions.RefreshTokenExpiration);

        //    var accessToken = GerarToken(accessTokenClaims, dataExpiracaoAccessToken);
        //    var refreshToken = GerarToken(refreshTokenClaims, dataExpiracaoRefreshToken);

        //    return new UsuarioResponseViewModel
        //    (
        //        status: true,
        //        accessToken: accessToken,
        //        validoAte: dataExpiracaoAccessToken.ToString("dd/MM/yyyy HH:mm"),
        //        refreshToken: refreshToken,
        //        nome: user.UserName,
        //        email: user.Email
        //    );
        //}

        //private string GerarToken(IEnumerable<Claim> claims, DateTime dataExpiracao)
        //{
        //    var jwt = new JwtSecurityToken(
        //        issuer: _jwtOptions.Issuer,
        //        audience: _jwtOptions.Audience,
        //        claims: claims,
        //        expires: dataExpiracao,
        //        signingCredentials: _jwtOptions.SigningCredentials);

        //    return new JwtSecurityTokenHandler().WriteToken(jwt);
        //}

        //private async Task<IList<Claim>> ObterClaims(IdentityUser user, bool adicionarClaimsUsuario)
        //{
        //    var claims = new List<Claim>();

        //    claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.Id));
        //    claims.Add(new Claim(JwtRegisteredClaimNames.Email, user.Email));
        //    claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
        //    claims.Add(new Claim(JwtRegisteredClaimNames.Nbf, ToUnixEpochDate(DateTime.UtcNow).ToString()));
        //    claims.Add(new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(DateTime.UtcNow).ToString(), ClaimValueTypes.Integer64));

        //    if (adicionarClaimsUsuario)
        //    {
        //        var userClaims = await _userManager.GetClaimsAsync(user);
        //        var roles = await _userManager.GetRolesAsync(user);

        //        foreach (var role in roles)
        //            claims.Add(new Claim("roles", role));
        //    }

        //    return claims;
        //}

        //private static long ToUnixEpochDate(DateTime date) =>
        //    (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);
    }
}
