using BonaLiz.Api.Controller.Errors;
using BonaLiz.Identity.Interfaces;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace BonaLiz.Api.Controller
{
    [ApiController]
    public class UsuarioController(IIdentityService _identityService) : ControllerBase
    {
        [Authorize(Roles = "Administrador")]
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
    }
}
