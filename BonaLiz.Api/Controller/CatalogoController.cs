using BonaLiz.Api.Authentication;
using BonaLiz.Api.Controller.Response;
using BonaLiz.Api.Helpers;
using BonaLiz.Dados.Models;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.Services;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BonaLiz.Api.Controller
{
    [ApiController]
    [ApiKey]
    public class CatalogoController(IProdutoServices _produtoServices, ITipoProdutoServices _tipoProdutoServices) : ControllerBase
    {
        [HttpGet]
        [Route("/Listar")]
        public async Task<IActionResult> ListaPrincipal()
        {
            try
            {
                var produto = _produtoServices.ListarPrincipal();
                if (produto.Count == 0)
                {
                    return BadRequest(BaseResponseFactory.Fail<ProdutoViewModel>("Erro ao listar produto"));
                }
                return Ok(BaseResponseFactory.Success(produto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        [Route("/TipoProdutoSelectList")]
        public async Task<IActionResult> SelectListTipoProdutor()
        {
            try
            {
                var tipoProduto = SelectListHelper.AddSelectList(new SelectList(_tipoProdutoServices.Listar().Where(x => x.Inativo == "False").ToList(), "Id", "Nome"));

                if (tipoProduto == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Nenhum tipo produto encontrado"));
                }
                return Ok(BaseResponseFactory.Success(tipoProduto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("/FiltarTipoProdutoId")]
        public async Task<IActionResult> FiltarTipoProdutoId([FromBody] ProdutoViewModel model)
        {
            var tipo = _produtoServices.FiltrarTipoProdutoId(model.TipoProdutoId);
            if (tipo == null)
            {
                return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Nenhum tipo produto encontrado"));
            }
            return Ok(BaseResponseFactory.Success(tipo));

        }
    }
}
