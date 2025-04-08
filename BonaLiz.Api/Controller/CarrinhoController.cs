using BonaLiz.Api.Authentication;
using BonaLiz.Api.Controller.Response;
using BonaLiz.Dados.Models;
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
    public class CarrinhoController(ICarrinhoServices _carrinhoServices) : ControllerBase
    {

        [HttpPost]
        [Route("Inserir")]
        public IActionResult Inserir([FromBody] List<CarrinhoItensViewModel> model)
        {
            try
            {
                _carrinhoServices.Inserir(model);
                return Ok(BaseResponseFactory.Success(""));
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
                return Ok(BaseResponseFactory.Success(""));
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
                return Ok(BaseResponseFactory.Success(""));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
