using BonaLiz.Api.Authentication;
using BonaLiz.Api.Controller.Response;
using BonaLiz.Dados.Models;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.Services;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BonaLiz.Api.Controller
{
    [ApiController]
    [Authorize(Roles = "Administrador")]
    public class VendasController(IVendaServices _vendaServices, IProdutoServices _produtoServices) : ControllerBase
    {

		[HttpPost]
		[Route("/CadastrarVenda")]
		public async Task<IActionResult> Cadastrar(VendaViewModel model)
		{
			try
			{
				var produtoQuantidade = _produtoServices.ObterPorId(Convert.ToInt32(model.ProdutoId)).Quantidade;
				if (Convert.ToInt32(model.Quantidade) > Convert.ToInt32(produtoQuantidade))
				{
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Quantidade maior que estoque"));
				}
				var venda = _vendaServices.Inserir(model);
                if (venda == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Erro ao inserir venda"));
                }
                return Ok(BaseResponseFactory.Success(venda));
			}
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}

		[HttpGet]
		[Route("/ListarVendas")]
        
        public async Task<IActionResult> Listar()
		{
			try
			{
				var vendas = _vendaServices.Listar();

                if (vendas == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Erro ao listar vendas"));
                }
                return Ok(BaseResponseFactory.Success(vendas));
            }
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}

		[HttpGet]
		[Route("/VendasPorGuid")]
		public async Task<IActionResult> VendaPorGuid(Guid guid)
		{
			try
			{
				var venda = _vendaServices.ObterPorGuid(guid);

                if (venda == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Erro ao listar vendas"));
                }
                return Ok(BaseResponseFactory.Success(venda));
            }
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}

		[HttpPost]
		[Route("/VendasFiltar")]
		public async Task<IActionResult> VendasFiltar(VendaViewModel model)
		{
			try
			{
				var venda = _vendaServices.Filtrar(model);

                if (venda == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Erro ao listar vendas"));
                }
                return Ok(BaseResponseFactory.Success(venda));
            }
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}

		[HttpPut]
		[Route("/VendasCancelar")]
		public async Task<IActionResult> VendasCancelar(int id)
		{
			try
			{
				var venda = _vendaServices.Cancelar(id);
                if (venda == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Erro ao listar vendas"));
                }
                return Ok(BaseResponseFactory.Success(venda));
            }
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}

		[HttpPut]
		[Route("/VendasStatus")]
		public async Task<IActionResult> VendasStatus(int id, string status)
		{
			try
			{
				var venda = _vendaServices.StatusVenda(id, status);
                if (venda == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Erro ao listar vendas"));
                }
                return Ok(BaseResponseFactory.Success(venda));
            }
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}
	}
}
