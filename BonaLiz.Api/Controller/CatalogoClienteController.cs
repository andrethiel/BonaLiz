using BonaLiz.Api.Authentication;
using BonaLiz.Api.Controller.Response;
using BonaLiz.Dados.Models;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BonaLiz.Api.Controller
{
    [ApiController]
    [ApiKey]
    public class CatalogoClienteController(IClienteCarrinhoServices _clienteCarrinhoServices) : ControllerBase
    {
        [HttpPost]
        [Route("/CadastrarClienteCatalogo")]
        public async Task<IActionResult> Cliente(ClienteViewModel model)
        {
            try
            {
                var carrinho = _clienteCarrinhoServices.Inserir(model);

                if (carrinho == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<ClienteViewModel>("Erro ao listar produto"));
                }
                return Ok(BaseResponseFactory.Success(carrinho));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        [Route("/ObterClientePorTelefone")]
        public async Task<IActionResult> ObterClientePorTelefone([FromQuery] ClienteViewModel model)
        {
            try
            {
                var cliente = _clienteCarrinhoServices.ObterClientePorTelefone(model);
                if (cliente == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<ClienteViewModel>("Erro ao listar produto"));
                }
                return Ok(BaseResponseFactory.Success(cliente));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
