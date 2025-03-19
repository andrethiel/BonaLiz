using Azure.Core;
using BonaLiz.Api.Controller.Errors;
using BonaLiz.Dados.Models;
using BonaLiz.Identity.Interfaces;
using BonaLiz.Identity.Services;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace BonaLiz.Api.Controller
{
    [ApiController]
    public class UsuarioController(IIdentityService _identityService, IHttpContextAccessor _acessor) : ControllerBase
    {
        [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
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
        [AllowAnonymous]

        public async Task<ActionResult<UsuarioResponseViewModel>> Login(UsuarioViewModel model)
        {
            var resultado = await _identityService.Login(model, Response.HttpContext);
            if (!resultado.Status)
            {
                var problemas = new CustomProblemDetails(HttpStatusCode.BadRequest, Request, errors: resultado.Erros);
                return BadRequest(problemas);
            }

            return Ok(new
            {
                status = resultado.Status,
                nome = resultado.Nome,
                email = resultado.Email,
                role = resultado.Role
            });
        }

        [HttpGet]
        [Route("Sair")]
        [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
        public async Task Sair()
        {
            await Response.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
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
