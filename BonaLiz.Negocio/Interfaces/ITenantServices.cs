using BonaLiz.Dados.Models;
using BonaLiz.Negocio.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.Interfaces
{
    public interface ITenantServices
    {
        TenantConfig GetTenantById(int tenantId);
    }
}
