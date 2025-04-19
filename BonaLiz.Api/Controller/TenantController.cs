using BonaLiz.Api.Controller.Response;
using BonaLiz.Dados.Models;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BonaLiz.Api.Controller
{
    [Authorize(Roles = "Administrador")]
    [ApiController]
    public class TenantController(ITenantServices _tenantServices, IHttpContextAccessor _httpContextAccessor) : ControllerBase
    {
        [HttpGet]
        [Route("ObterTenant")]
        public IActionResult ObterTenant()
        {
            var tenantId = _httpContextAccessor.HttpContext?.Items["TenantId"] as int?;
            try
            {
                var tenant = _tenantServices.GetTenantById(tenantId.Value);
                if (tenant == null)
                {
                    return BadRequest(BaseResponseFactory.Fail<VendaViewModel>("Erro ao inserir venda"));
                }
                return Ok(BaseResponseFactory.Success(tenant));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
