using BonaLiz.Api.Controller.Response;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
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
            var menu = _menuServices.Menu(role);
            if (menu == null)
            {
                return BadRequest(BaseResponseFactory.Fail<MenuItemViewModel>("Erro ao listar produto"));
            }
            return Ok(BaseResponseFactory.Success(menu));
        }
    }
}
