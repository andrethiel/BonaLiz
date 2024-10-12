using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.Services;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BonaLiz.Api.Controller
{
    [ApiController]
    public class TipoProdutoController : ControllerBase
    {
        private readonly ITipoProdutoServices _tipoProdutoServices;
        public TipoProdutoController(ITipoProdutoServices tipoProdutoServices)
        {
            _tipoProdutoServices = tipoProdutoServices;
        }

        [HttpPost]
        [Route("/CadastrarTipoProduto")]
        public async Task<IActionResult> Cadastro(TipoProdutoViewModel model)
        {
            try
            {
                if (!_tipoProdutoServices.Listar().Where(x => x.Nome == model.Nome).Any())
                {
                    _tipoProdutoServices.Cadastrar(model);
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
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("/EditarTipoProduto")]
        public async Task<IActionResult> Editar(TipoProdutoViewModel model)
        {
            try
            {
                _tipoProdutoServices.Editar(model);
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
        [Route("/ListarTipoProduto")]
        public async Task<IActionResult> Listar()
        {
            try
            {
                return Ok(_tipoProdutoServices.Listar().Take(50));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet]
        [Route("/TipoProdutoPorGuid")]
        public async Task<IActionResult> ObterPorGuid(Guid guid)
        {
            try
            {
                return Ok(_tipoProdutoServices.ObterPorGuid(guid));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("/TipoProdutoFiltar")]
        public async Task<IActionResult> Filtrar(TipoProdutoViewModel model)
        {
            try
            {
                return Ok(_tipoProdutoServices.Filtrar(model));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
