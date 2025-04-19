using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Domain.Repository
{
    public class TenantRepository(IRepositoryBase<Tenant> _repositoryBase) : ITenantRepository
    {
        public Tenant GetTenantById(int tenantId) => _repositoryBase.Listar().FirstOrDefault(x => x.Id == tenantId)!;
    }
}
