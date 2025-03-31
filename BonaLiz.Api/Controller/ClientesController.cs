using BonaLiz.Api.Authentication;
using BonaLiz.Api.Controller.Response;
using BonaLiz.Api.Helpers;
using BonaLiz.Dados.Models;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.Services;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BonaLiz.Api.Controller
{
	[ApiController]
	[Authorize(Roles = "Administrador")]
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
				var lista = _clienteServices.Listar();

                if (!lista.Where(x => x.Nome == model.Nome).Any())
				{
					var cliente = _clienteServices.Inserir(model);
                    if (cliente == null)
                    {
                        return BadRequest(BaseResponseFactory.Fail<ClienteViewModel>("Erro ao cadastrar cliente"));
                    }
                    return Ok(BaseResponseFactory.Success(cliente));
				}
				else
				{
                    return BadRequest(BaseResponseFactory.Fail<ClienteViewModel>("Cliente já cadastrado"));
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
				var cliente = _clienteServices.Editar(model);
                if (cliente == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<ClienteViewModel>("Erro ao cadastrar cliente"));
                }
                return Ok(BaseResponseFactory.Success(cliente));
            }
			catch(Exception ex)
			{
				return BadRequest(ex);
			}
		}

		[HttpGet]
		[Route("/ListarClientes")]
		public async Task<IActionResult> Listar()
		{
			try
			{
				var clientes = _clienteServices.Listar();
                if (clientes.Count == 0)
                {
                    return BadRequest(BaseResponseFactory.Fail<ClienteViewModel>("Nenhum cliente encontrado"));
                }
                return Ok(BaseResponseFactory.Success(clientes));
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
				var cliente = _clienteServices.ObterPorGuid(guid);

                if (cliente == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<ClienteViewModel>("Erro ao cadastrar cliente"));
                }
                return Ok(BaseResponseFactory.Success(cliente));
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
				var cliente = _clienteServices.Filtrar(model);
                if (cliente == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<ClienteViewModel>("Erro ao cadastrar cliente"));
                }
                return Ok(BaseResponseFactory.Success(cliente));
			}
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}

		[HttpGet]
		[Route("/SelectListClientes")]
		public async Task<IActionResult> SelectListFornencedor()
		{
			try
			{
				var clientes = _clienteServices.Listar();

                if (clientes.Count == 0)
                {
                    return BadRequest(BaseResponseFactory.Fail<ClienteViewModel>("Erro ao cadastrar cliente"));
                }
                return Ok(BaseResponseFactory.Success(SelectListHelper.AddSelectList(new SelectList(clientes, "Id", "Nome"))));
			}
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}

        

    }
}
