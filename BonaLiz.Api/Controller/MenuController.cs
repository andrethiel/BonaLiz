using BonaLiz.Negocio.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BonaLiz.Api.Controller
{
    [ApiController]
    public class MenuController(IMenuServices _menuServices) : ControllerBase
    {
        [HttpGet]
        [Route("MenuListar")]
        public IActionResult Menu(string role)
        {
            return Ok(_menuServices.Menu(role));
        }
    }
}
