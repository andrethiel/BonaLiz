using BonaLiz.Api.Authentication;
using BonaLiz.Api.Controller.Response;
using BonaLiz.Api.Helpers;
using BonaLiz.Dados.Models;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BonaLiz.Api.Controllers
{
    [ApiController]
    [Authorize(Roles = "Administrador")]
    
    public class FornecedorController : ControllerBase
    {
        private readonly IFornecedorServices _fornecedorServices;
        public FornecedorController(IFornecedorServices fornecedorServices)
        {
            _fornecedorServices = fornecedorServices;
        }

        [HttpPost]
        [Route("/CadastrarForncedor")]
        public async Task<IActionResult> Cadastro(FornecedorViewModel model)
        {
            var cookie = Response.HttpContext.Request.Cookies;
            try
            {
                if(!_fornecedorServices.Listar().Where(x => x.Nome == model.Nome).Any())
                {
                    var cnpj = model.CNPJ.Replace(".", "").Replace("/", "").Replace("-", "");
                    model.CNPJ = cnpj;
                    var fornecedor = _fornecedorServices.Inserir(model);
                    if (fornecedor == null)
                    {
                        return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Erro ao editar fornecedor"));
                    }
                    return Ok(BaseResponseFactory.Success(fornecedor));
                }
                else
                {
                    return Ok(BaseResponseFactory.Fail<FornecedorViewModel>("Fornecedor já cadastrado"));
                }
            }
            catch (Exception ex) {
                return BadRequest(ex);
            }
            
        }

        [HttpPut]
        [Route("/EditarForncedor")]
        public async Task<IActionResult> Editar(FornecedorViewModel model)
        {
            try
            {
				var cnpj = model.CNPJ.Replace(".", "").Replace("/", "").Replace("-", "");
				model.CNPJ = cnpj;
				var fornecedor = _fornecedorServices.Editar(model);
                if (fornecedor == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Erro ao editar fornecedor"));
                }
                return Ok(BaseResponseFactory.Success(fornecedor));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        [Route("/ListarForncedor")]
        public async Task<IActionResult> Listar()
        {
            try
            {
                return Ok(_fornecedorServices.Listar().Take(50));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet]
        [Route("/ForncedorPorGuid")]
        public async Task<IActionResult> ObterPorGuid(Guid guid)
        {
            try
            {
                return Ok(_fornecedorServices.ObterPorGuid(guid));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("/ForncedorFiltar")]
        public async Task<IActionResult> Filtrar(FornecedorViewModel model)
        {
            try
            {
                return Ok(_fornecedorServices.Filtrar(model));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
		[HttpGet]
		[Route("/SelectListForncedor")]
		public async Task<IActionResult> SelectListFornencedor()
		{
			try
			{
				return Ok(SelectListHelper.AddSelectList(new SelectList(_fornecedorServices.Listar().Where(x => x.Inativo == "False").ToList(), "Id", "Nome")));
			}
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}
	}
}
