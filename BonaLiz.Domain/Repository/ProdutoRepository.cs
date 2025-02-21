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
    public class ProdutoRepository(IRepositoryBase<Produto> _repositoryBase) : IProdutoRepository
    {
        public void Editar(Produto model) => _repositoryBase.Editar(model);

        public void Inserir(Produto model) => _repositoryBase.Inserir(model);

        public List<Produto> Listar() => _repositoryBase.Listar();

        public Produto ObterPorGuid(Guid guid) => _repositoryBase.ObterPorGuid(guid);

        public Produto ObterPorId(int id) => _repositoryBase.ObterPorId(id);



        public List<Produto> Filtrar(Produto model) => _repositoryBase.Filtrar(x => string.IsNullOrEmpty(model.Nome) || x.Nome.Contains(model.Nome)
        && model.FornecedorId == null || x.FornecedorId == model.FornecedorId
        && model.TipoProdutoId == null || x.TipoProdutoId == model.TipoProdutoId
        && model.DataCompra == null || x.DataCompra == model.DataCompra
        && x.Quantidade > 0 && x.Inativo == false);
            
    }
}
