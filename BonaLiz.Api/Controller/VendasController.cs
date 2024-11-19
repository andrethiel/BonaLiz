using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.Services;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BonaLiz.Api.Controller
{
	[ApiController]
	public class VendasController : ControllerBase
	{
        private readonly IVendaServices _vendaServices;
		private readonly IProdutoServices _produtoServices;

		public VendasController(IVendaServices vendaServices, IProdutoServices produtoServices)
		{
			_vendaServices = vendaServices;
			_produtoServices = produtoServices;
		}

		[HttpPost]
		[Route("/CadastrarVenda")]
		public async Task<IActionResult> Cadastrar(VendaViewModel model)
		{
			try
			{
				var produtoQuantidade = _produtoServices.ObterPorId(Convert.ToInt32(model.ProdutoId)).Quantidade;
				if (Convert.ToInt32(model.Quantidade) > Convert.ToInt32(produtoQuantidade))
				{
					return Ok(new
					{
						status = false,
						message = "Quantidade maior que estoque"
					});
				}
				else
				{
					_vendaServices.Inserir(model);
					return Ok(new
					{
						status = true,
						message = "Cadastrado com sucesso"
					});
				}
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
				return Ok(_vendaServices.Listar());
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
				return Ok(_vendaServices.ObterPorGuid(guid));
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
				model.ProdutoId = string.IsNullOrEmpty(model.ProdutoId) ? null : model.ProdutoId;
				model.DataVenda = string.IsNullOrEmpty(model.DataVenda) ? null : model.DataVenda;
				return Ok(_vendaServices.Filtrar(model));
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
				_vendaServices.Cancelar(id);
				return Ok(new
				{
					status = true,
					message = "Venda cancelada com sucesso"
				});
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
				_vendaServices.StatusVenda(id, status);
				return Ok(new
				{
					status = true,
					message = "Status da venda alterado com sucesso"
				});
			}
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}
	}
}
