using BonaLiz.Api.Authentication;
using BonaLiz.Api.Controller.Response;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using MassTransit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BonaLiz.Api.Controller
{
    [ApiController]
    [ApiKey]
    public class CheckoutController( IPublishEndpoint _publishEndpoint, ICheckoutServices _checkoutServices) : ControllerBase
    {
        [HttpGet]
        [Route("Checkout")]
        public async Task<IActionResult> Checkout(string carrinhoId)
        {
            var venda = _checkoutServices.Checkout(carrinhoId);
            if (venda == null)
            {
                return BadRequest(BaseResponseFactory.Fail<string>("Erro ao inserir venda"));
            }

            return Ok(BaseResponseFactory.Success(venda));
        }

        [HttpPost]
        [Route("Checkout")]
        public async Task<IActionResult> Checkout(CarrinhoViewModel model)
        {
            try
            {
                await _publishEndpoint.Publish(model);

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
