using BonaLiz.Dados.Context;
using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Domain.Repository
{
    public class TipoProdutoRepository(IRepositoryBase<TipoProduto> _repositoryBase) : ITipoProdutoRepository
    {

        public TipoProduto Cadastrar(TipoProduto model)
        {
            try
            {
                return _repositoryBase.Inserir(model);
            }
            catch (Exception ex) {
                throw;
            }
            
        }

        public TipoProduto Editar(TipoProduto model)
        {
            try
            {
                return _repositoryBase.Editar(model);
            }
            catch (Exception ex) { 
                throw;
            }   
        }

        public List<TipoProduto> Filtrar(TipoProduto model) => _repositoryBase.Listar()
            .Where(x => string.IsNullOrEmpty(model.Nome) || x.Nome.ToUpper().Contains(model.Nome.ToUpper())).ToList();

        public List<TipoProduto> Listar() => _repositoryBase.Listar();

        public TipoProduto ObterPorGuid(Guid guid) => _repositoryBase.ObterPorGuid(guid);

        public TipoProduto ObterPorId(int id) => _repositoryBase.ObterPorId(id);

    }
}
