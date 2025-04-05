using BonaLiz.Api.Authentication;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using MassTransit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BonaLiz.Api.Controller
{
    [ApiController]
    [ApiKey]
    public class CarrinhoController(ICarrinhoServices _carrinhoServices, IPublishEndpoint _publishEndpoint, ILogger<CarrinhoController> _logger) : ControllerBase
    {

        [HttpPost]
        [Route("Inserir")]
        public IActionResult Inserir([FromBody] List<CarrinhoItensViewModel> model)
        {
            try
            {
                _carrinhoServices.Inserir(model);
                return Ok(new
                {
                    status = true,
                    message = "Cadastrado com sucesso"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("UpdateQuantidade")]
        public IActionResult UpdateQuantidade([FromBody] CarrinhoItensViewModel model)
        {
            try
            {

                _carrinhoServices.AlteraQuantidade(model);
                return Ok(new
                {
                    status = true,
                    message = "Cadastrado com sucesso"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("Removeritem")]
        public IActionResult Removeritem([FromBody] CarrinhoItensViewModel model)
        {
            try
            {

                _carrinhoServices.DeletarItem(model);
                return Ok(new
                {
                    status = true,
                    message = "Cadastrado com sucesso"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("Checkout")]
        public async Task<IActionResult> Checkout([FromBody] CarrinhoItensViewModel model)
        {
            try
            {
                await _publishEndpoint.Publish(model);

                _logger.LogInformation("Mensagem publicada com sucesso");

                return Ok();
                
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
