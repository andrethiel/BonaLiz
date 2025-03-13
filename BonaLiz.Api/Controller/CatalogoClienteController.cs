using BonaLiz.Api.Authentication;
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
                var telefone = model.Telefone.Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "");
                model.Telefone = telefone;
                var carrinho = _clienteCarrinhoServices.Inserir(model);
                return Ok(new
                {
                    carrinhoId = carrinho.CarrinhoId,
                    status = true,

                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
