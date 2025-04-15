using BonaLiz.Api.Controller.Response;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BonaLiz.Api.Controller
{
    [ApiController]
    [Authorize(Roles = "Administrador")]
    public class CarrinhoController(ICarrinhoServices _carrinhoServices) : ControllerBase
    {

        [HttpGet]
        [Route("ListarCarrinho")]
        public IActionResult ListarCarrinho()
        {
            try
            {
                var carrinho = _carrinhoServices.ListarCarrinhos();
                if (carrinho == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<ClienteViewModel>("Erro ao listar produto"));
                }
                return Ok(BaseResponseFactory.Success(carrinho));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
