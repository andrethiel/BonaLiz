using BonaLiz.Dados.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Domain.Interfaces
{
    public interface IRepositoryBase<TEntity> 
    {
        void Inserir(TEntity model);
        void Editar(TEntity model);
        List<TEntity> Listar();
        TEntity ObterPorId(int id);
        TEntity ObterPorGuid(Guid Guid);
        List<TEntity> Filtrar(Expression<Func<TEntity, bool>> filter = null);
    }
}
