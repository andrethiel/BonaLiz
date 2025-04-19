using BonaLiz.Api.Controller.Errors;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using BonaLiz.Identity.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace BonaLiz.Api.Controller
{
    [ApiController]
    public class LoginController(IIdentityService _identityService) : ControllerBase
    {
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
        public async Task Sair()
        {
            await Response.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }
}
