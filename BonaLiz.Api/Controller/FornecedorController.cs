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
				var fornecerdor = _fornecedorServices.Editar(model);
                if (fornecerdor == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Erro ao editar fornecedor"));
                }
                return Ok(BaseResponseFactory.Success(fornecerdor));
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
                var fornecerdor = _fornecedorServices.Listar().Take(50);
                if (fornecerdor == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Erro ao listar fornecedores"));
                }
                return Ok(BaseResponseFactory.Success(fornecerdor));
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
                var fornecedor = _fornecedorServices.ObterPorGuid(guid);
                if (fornecedor == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Fornecedor não encontrado"));
                }
                return Ok(BaseResponseFactory.Success(fornecedor));
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
                var fornecedor = _fornecedorServices.Filtrar(model);
                if (fornecedor.Count == 0)
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Fornecedor não encontrado"));
                }
                return Ok(BaseResponseFactory.Success(fornecedor));
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
                var fornecedor = SelectListHelper.AddSelectList(new SelectList(_fornecedorServices.Listar().Where(x => x.Inativo == "False").ToList(), "Id", "Nome"));

                if (fornecedor == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<FornecedorViewModel>("Fornecedor não encontrado"));
                }
                return Ok(BaseResponseFactory.Success(fornecedor));
            }
			catch (Exception ex)
			{
				return BadRequest(ex);
			}
		}
	}
}
