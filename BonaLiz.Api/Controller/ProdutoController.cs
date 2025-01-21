using BonaLiz.Api.Authentication;
using BonaLiz.Api.Helpers;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.Services;
using BonaLiz.Negocio.Utils;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Globalization;

namespace BonaLiz.Api.Controller
{
    [ApiController]
	[ApiKey]
	public class ProdutoController : ControllerBase
    {
        private readonly IProdutoServices _produtoServices;
        public ProdutoController(IProdutoServices produtoServices)
        {
            _produtoServices = produtoServices;
        }
        [HttpPost]
        [Route("/CadastrarProduto")]
        public async Task<IActionResult> Cadastro([FromForm] ProdutoViewModel model)
        {
            try
            {
                if(!_produtoServices.Listar().Where(x => x.Nome == model.Nome).Any())
                {
                    
                    _produtoServices.Cadastrar(model);
                    return Ok(new
                    {
                        status = true,
                        message = "Cadastrado com sucesso"
                    });
                }
                else
                {
                    return Ok(new
                    {
                        status = false,
                        message = "Produto já cadastrado"
                    });
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
				_produtoServices.Editar(model);
                return Ok(new
                {
                    status = true,
                    message = "Editado com sucesso"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        [Route("/ListarProdutos")]
        public async Task<IActionResult> Listar()
        {
            try
            {
                return Ok(_produtoServices.Listar());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet]
        [Route("/ProdutoPorGuid")]
        public async Task<IActionResult> ObterPorGuid(Guid guid)
        {
            try
            {
                return Ok(_produtoServices.ObterPorGuid(guid));
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
				model.Nome = string.IsNullOrEmpty(model.Nome) ? null : model.Nome;
				model.FornecedorId = string.IsNullOrEmpty(model.FornecedorId) ? null : model.FornecedorId;
				model.TipoProdutoId = string.IsNullOrEmpty(model.TipoProdutoId) ? null : model.TipoProdutoId;
				model.DataCompra = string.IsNullOrEmpty(model.DataCompra) ? null : model.DataCompra;
                model.Quantidade = string.IsNullOrEmpty(model.Quantidade) ? null : model.Quantidade;
                return Ok(_produtoServices.Filtrar(model));
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
		[Route("/ListaPrincipal")]
		public async Task<IActionResult> ListaPrincipal()
		{
			try
			{
				return Ok(_produtoServices.ListarPrincipal());
			}
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}


		[HttpGet]
		[Route("/SelectListProdutos")]
		public async Task<IActionResult> SelectListProdutos()
		{
			try
			{
				return Ok(SelectListHelper.AddSelectList(new SelectList(_produtoServices.Listar().Where(x => x.Inativo == "False").ToList(), "Id", "Nome")));
			}
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}

		//[HttpPost]
		//[Route("/arquivoProduto")]
		//public async Task<IActionResult> arquivoProduto([FromForm] ProdutoViewModel model)
  //      {
  //          return Ok(Arquivo.Imagem(model.Arquivo));
  //      }
	}
}
