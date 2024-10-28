using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.Services;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BonaLiz.Api.Controller
{
    [ApiController]
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
                return Ok(_produtoServices.Listar().Take(50));
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
        public async Task<IActionResult> Filtrar(ProdutoViewModel model)
        {
            try
            {
				model.Nome = string.IsNullOrEmpty(model.Nome) ? null : model.Nome;
				model.FornecedorId = string.IsNullOrEmpty(model.FornecedorId) ? null : model.FornecedorId;
				model.TipoProdutoId = string.IsNullOrEmpty(model.TipoProdutoId) ? null : model.TipoProdutoId;
				model.DataCompra = string.IsNullOrEmpty(model.DataCompra) ? null : model.DataCompra;
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
				var lucro = custo - venda;

				return Ok(lucro.ToString("C"));
			}
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}

		[HttpGet]
		[Route("/Caminho")]
		public async Task<IActionResult> Caminho()
		{
			try
			{

				return Ok(AppDomain.CurrentDomain.BaseDirectory.ToString());
			}
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}
	}
}
