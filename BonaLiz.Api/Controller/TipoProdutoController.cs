using BonaLiz.Api.Authentication;
using BonaLiz.Api.Controller.Response;
using BonaLiz.Api.Helpers;
using BonaLiz.Dados.Models;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.Services;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BonaLiz.Api.Controller
{
    [ApiController]
    [Authorize(Roles = "Administrador")]
    public class TipoProdutoController(ITipoProdutoServices _tipoProdutoServices) : ControllerBase
    {

        [HttpPost]
        [Route("/CadastrarTipoProduto")]
        public async Task<IActionResult> Cadastro(TipoProdutoViewModel model)
        {
            try
            {
                if (!_tipoProdutoServices.Listar().Where(x => x.Nome == model.Nome).Any())
                {
                    var tipoProduto = _tipoProdutoServices.Cadastrar(model);
                    if (tipoProduto == null)
                    {
                        return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Erro ao cadastrar tipo produto"));
                    }
                    return Ok(BaseResponseFactory.Success(tipoProduto));
                }
                else
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Tipo produto já está cadastrado"));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        [Route("/EditarTipoProduto")]
        public async Task<IActionResult> Editar(TipoProdutoViewModel model)
        {
            try
            {
                var tipoProduto = _tipoProdutoServices.Editar(model);
                if (tipoProduto == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Erro ao editar tipo produto"));
                }
                return Ok(BaseResponseFactory.Success(tipoProduto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet]
        [Route("/ListarTipoProduto")]
        public async Task<IActionResult> Listar()
        {
            try
            {
                var tipoProduto = _tipoProdutoServices.Listar().Take(50);
                if (tipoProduto == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Erro ao listar tipo produtos"));
                }
                return Ok(BaseResponseFactory.Success(tipoProduto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet]
        [Route("/TipoProdutoPorGuid")]
        public async Task<IActionResult> ObterPorGuid(Guid guid)
        {
            try
            {
                var tipoProduto = _tipoProdutoServices.ObterPorGuid(guid);
                if (tipoProduto == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Tipo produto não encontrado"));
                }
                return Ok(BaseResponseFactory.Success(tipoProduto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("/TipoProdutoFiltar")]
        public async Task<IActionResult> Filtrar(TipoProdutoViewModel model)
        {
            try
            {
                var tipoProduto = _tipoProdutoServices.Filtrar(model);
                if (tipoProduto.Count == 0)
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Tipo produto não encontrado"));
                }
                return Ok(BaseResponseFactory.Success(tipoProduto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

		[HttpGet]
		[Route("/SelectListTipoProduto")]
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
	}
}
