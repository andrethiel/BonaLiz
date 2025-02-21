using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BonaLiz.Api.Controller
{
    [ApiController]
    public class CarrinhoController : ControllerBase
    {
        private readonly ICarrinhoServices _carrinhoServices;
        public CarrinhoController(ICarrinhoServices carrinhoServices)
        {
            _carrinhoServices = carrinhoServices;
        }

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
    }
}
