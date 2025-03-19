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
        TEntity Inserir(TEntity model);
        int InserirScalar(TEntity model);
        void InserirRange(List<TEntity> model);
        TEntity Editar(TEntity model);
        List<TEntity> Listar();
        TEntity ObterPorId(int id);
        TEntity ObterPorGuid(Guid Guid);
        //List<TEntity> Filtrar(Expression<Func<TEntity, bool>> filter = null);
        void Deletar(TEntity id);
    }
}
