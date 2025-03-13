using BonaLiz.Api.Authentication;
using BonaLiz.Api.Helpers;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.Services;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BonaLiz.Api.Controller
{
	[ApiController]
	[ApiKey]
	public class ClientesController : ControllerBase
	{
		private readonly IClienteServices _clienteServices;

		public ClientesController(IClienteServices clienteServices)
		{
			_clienteServices = clienteServices;
		}


		[HttpPost]
		[Route("/CadastrarCliente")]
		public async Task<IActionResult> Cadastrar(ClienteViewModel model)
		{
			try
			{
				var lista = _clienteServices.Listar(model);

                if (!lista.Where(x => x.Nome == model.Nome).Any())
				{
					var telefone = model.Telefone.Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "");
					model.Telefone = telefone;
					_clienteServices.Inserir(model);
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
						message = "Cliente já cadastrado"
					});
				}
			}
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}

		[HttpPut]
		[Route("/EditarCliente")]
		public IActionResult Editar(ClienteViewModel model)
		{
			try
			{
				var telefone = model.Telefone.Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "");
				model.Telefone = telefone;
				_clienteServices.Editar(model);
				return Ok(new
				{
					status = true,
					message = "Editado com sucesso"
				});
			}
			catch(Exception ex)
			{
				return BadRequest(ex);
			}
		}

		[HttpGet]
		[Route("/ListarClientes")]
		public async Task<IActionResult> Listar(ClienteViewModel model)
		{
			try
			{
				return Ok(_clienteServices.Listar(model));
			}
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}

		[HttpGet]
		[Route("/ClientePorGuid")]
		public async Task<IActionResult> ObterPorGuid(Guid guid)
		{
			try
			{
				return Ok(_clienteServices.ObterPorGuid(guid));
			}
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}

		[HttpPost]
		[Route("/ClienteFiltrar")]
		public async Task<IActionResult> Filtrar(ClienteViewModel model)
		{
			try
			{
				return Ok(_clienteServices.Filtrar(model));
			}
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}

		[HttpGet]
		[Route("/SelectListClientes")]
		public async Task<IActionResult> SelectListFornencedor(ClienteViewModel model)
		{
			try
			{
				var lista = _clienteServices.Listar(model);
                return Ok(SelectListHelper.AddSelectList(new SelectList(lista, "Id", "Nome")));
			}
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}

        

    }
}
