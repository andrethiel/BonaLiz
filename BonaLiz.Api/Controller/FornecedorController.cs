using BonaLiz.Api.Helpers;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BonaLiz.Api.Controllers
{
    [ApiController]
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
                    _fornecedorServices.Inserir(model);
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
                        message = "Fornecedor já cadastrado"
                    });
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
				_fornecedorServices.Editar(model);
                return Ok(new
                {
                    status = true,
                    message = "Editado com sucesso"
                });
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
