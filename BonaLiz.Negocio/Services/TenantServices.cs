using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.Utils;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.Services
{
    public class TenantServices(ITenantRepository _tenantRepository, IHttpContextAccessor _httpContextAccessor) : ITenantServices
    {
        public TenantConfig GetTenantById(int tenantId)
        {
            var tenant = _tenantRepository.GetTenantById(tenantId);

            return new TenantConfig
            {
                CorPrimaria = tenant.CorPrimaria,
                CorSecundaria = tenant.CorSecundaria,
                LogoUrl = Arquivo.FormataURL(tenant.LogoUrl, _httpContextAccessor),
                Nome = tenant.Nome
            };
        }
    }
}
