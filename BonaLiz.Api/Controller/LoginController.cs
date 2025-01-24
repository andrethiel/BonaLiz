using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BonaLiz.Api.Controller
{
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginServices _loginServices;
        public LoginController(ILoginServices loginServices)
        {
            _loginServices = loginServices;
        }

        [HttpPost]
        [Route("/Login")]
        public IActionResult Entrar(LoginViewModel modelo)
        {
            try
            {
                var result = _loginServices.Entrar(modelo);
                if (result)
                {
                    return Ok(new
                    {
                        status = true,
                        message = "Logado com sucesso"
                    });
                }
                else
                {
                    return Ok(new
                    {
                        status = false,
                        message = "Email ou senha inválidos"
                    });
                }
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
