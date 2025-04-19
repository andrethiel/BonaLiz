using BonaLiz.Api.Controller.Response;
using BonaLiz.Dados.Models;
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

        [HttpGet]
        [Route("ListarItensCarrinho")]
        public IActionResult ListarItensCarrinho(string carrinhoId)
        {
            try
            {
                var itens = _carrinhoServices.ObterItensPorId(carrinhoId);
                if (itens == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<ClienteViewModel>("Erro ao listar produto"));
                }
                return Ok(BaseResponseFactory.Success(itens));
            }
            catch (Exception ex)
            {
                return BadRequest(BaseResponseFactory.Fail<ClienteViewModel>(ex.Message));
            }
        }
    }
}
