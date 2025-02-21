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

        public void Cadastrar(TipoProduto model)
        {
            try
            {
                _repositoryBase.Inserir(model);
            }
            catch (Exception ex) { }
            
        }

        public void Editar(TipoProduto model)
        {
            try
            {
                _repositoryBase.Editar(model);
            }
            catch (Exception ex) { }   
        }

        public List<TipoProduto> Filtrar(TipoProduto model) => _repositoryBase.Filtrar(x => string.IsNullOrEmpty(model.Nome) || x.Nome.Contains(model.Nome));

        public List<TipoProduto> Listar() => _repositoryBase.Listar();

        public TipoProduto ObterPorGuid(Guid guid) => _repositoryBase.ObterPorGuid(guid);

        public TipoProduto ObterPorId(int id) => _repositoryBase.ObterPorId(id);

    }
}
