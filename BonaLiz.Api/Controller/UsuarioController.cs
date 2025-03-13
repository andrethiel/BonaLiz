using Azure.Core;
using BonaLiz.Api.Controller.Errors;
using BonaLiz.Dados.Models;
using BonaLiz.Identity.Interfaces;
using BonaLiz.Identity.Services;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace BonaLiz.Api.Controller
{
    [ApiController]
    public class UsuarioController(IIdentityService _identityService, IHttpContextAccessor _acessor) : ControllerBase
    {
        [Route("CadastrarUsuario")]
        [HttpPost]
        public async Task<IActionResult> Cadastrar(UsuarioViewModel model)
        {
            var resultado = await _identityService.CadastrarUsuario(model);
            if (!resultado.Status)
            {
                var problemas = new CustomProblemDetails(HttpStatusCode.BadRequest, Request, errors: resultado.Erros);
                return BadRequest(problemas);
            }

            return Ok(resultado);
        }

        [HttpPost]
        [Route("Login")]

        public async Task<ActionResult<UsuarioResponseViewModel>> Login(UsuarioViewModel model)
        {
            var resultado = await _identityService.Login(model);
            if (!resultado.Status)
            {
                var problemas = new CustomProblemDetails(HttpStatusCode.BadRequest, Request, errors: resultado.Erros);
                return BadRequest(problemas);
            }

            Response.Cookies.Append("refreshToken", resultado.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            });

            return Ok(new
            {
                status = resultado.Status,
                accessToken = resultado.AccessToken,
                nome = resultado.Nome,
                email = resultado.Email
            });
        }

        //[HttpPost("refresh-token")]
        //public async Task<IActionResult> RefreshToken()
        //{
        //    if (!Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
        //    {
        //        return Unauthorized(new { message = "Token inválido" });
        //    }

        //    var user = await _userManager.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
        //    if (user == null || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
        //    {
        //        return Unauthorized(new { message = "Token expirado, faça login novamente" });
        //    }

        //    var newAccessToken = GenerateJwtToken(user);
        //    return Ok(new { accessToken = newAccessToken });
        //}
    }
}
