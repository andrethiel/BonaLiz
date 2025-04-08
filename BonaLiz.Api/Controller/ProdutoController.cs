using BonaLiz.Api.Authentication;
using BonaLiz.Api.Controller.Response;
using BonaLiz.Api.Helpers;
using BonaLiz.Dados.Models;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.Services;
using BonaLiz.Negocio.Utils;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Globalization;

namespace BonaLiz.Api.Controller
{
    [ApiController]
    [Authorize(Roles = "Administrador")]
    public class ProdutoController(IProdutoServices _produtoServices) : ControllerBase
    {
        [HttpPost]
        [Route("/CadastrarProduto")]
        public async Task<IActionResult> Cadastro([FromForm] ProdutoViewModel model)
        {
            try
            {
                if(!_produtoServices.Listar().Where(x => x.Nome == model.Nome).Any())
                {
                    var produto = _produtoServices.Cadastrar(model);
                    if (produto == null)
                    {
                        return BadRequest(BaseResponseFactory.Fail<ProdutoViewModel>("Erro ao cadastrar produto"));
                    }
                    return Ok(BaseResponseFactory.Success(produto));
                }
                else
                {
                    return BadRequest(BaseResponseFactory.Fail<ProdutoViewModel>("Erro produto já cadastrado"));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("/EditarProduto")]
        public async Task<IActionResult> Editar([FromForm] ProdutoViewModel model)
        {
            try
            {
                var produto = _produtoServices.Editar(model);
                if (produto == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<ProdutoViewModel>("Erro ao cadastrar produto"));
                }
                return Ok(BaseResponseFactory.Success(produto));
            }
            catch (Exception ex)
            {
                return BadRequest(BaseResponseFactory.Fail<ProdutoViewModel>(ex.Message));
            }
        }
        [HttpGet]
        [Route("/ListarProdutos")]
        public async Task<IActionResult> Listar(ProdutoViewModel model)
        {
            try
            {
                var produto = _produtoServices.Listar();
                if (produto.Count == 0)
                {
                    return BadRequest(BaseResponseFactory.Fail<ProdutoViewModel>("Erro ao cadastrar produto"));
                }
                return Ok(BaseResponseFactory.Success(produto));
            }
            catch (Exception ex)
            {
                return BadRequest(BaseResponseFactory.Fail<ProdutoViewModel>(ex.Message));
            }
        }
        [HttpGet]
        [Route("/ProdutoPorGuid")]
        public async Task<IActionResult> ObterPorGuid(Guid guid)
        {
            try
            {
                var produto = _produtoServices.ObterPorGuid(guid);
                if (produto == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<ProdutoViewModel>("Erro ao cadastrar produto"));
                }
                return Ok(BaseResponseFactory.Success(produto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("/ProdutoFiltar")]
        public async Task<IActionResult> Filtrar([FromBody]ProdutoViewModel model)
        {
            try
            {
                var produto = _produtoServices.Filtrar(model);

                if (produto.Count == 0)
                {
                    return BadRequest(BaseResponseFactory.Fail<ProdutoViewModel>("Nenhum produto encontrado"));
                }
                return Ok(BaseResponseFactory.Success(produto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


		[HttpGet]
		[Route("/ProdutoLucro")]
		public async Task<IActionResult> LucroProduto(string PrecoVenda, string PrecoCusto)
		{
			try
			{
                var venda = Convert.ToDecimal(PrecoVenda.Replace("R$", "").Trim());
                var custo = Convert.ToDecimal(PrecoCusto.Replace("R$", "").Trim());
				var lucro = Convert.ToDecimal(custo - venda);

				return Ok(lucro.ToString("C"));
			}
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}


		[HttpGet]
		[Route("/SelectListProdutos")]
		public async Task<IActionResult> SelectListProdutos(ProdutoViewModel model)
		{
			try
			{
                var produto = _produtoServices.Listar();
                if (produto.Count == 0)
                {
                    return BadRequest(BaseResponseFactory.Fail<ProdutoViewModel>("Erro ao cadastrar produto"));
                }
                return Ok(BaseResponseFactory.Success(SelectListHelper.AddSelectList(new SelectList(produto, "Id", "Nome"))));
			}
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}
	}
}
