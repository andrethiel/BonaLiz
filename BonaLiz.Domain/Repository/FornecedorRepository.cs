using BonaLiz.Dados.Context;
using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Domain.Repository
{
    public class FornecedorRepository(IRepositoryBase<Fornecedor> _repositoryBase) : IFornecedorRepository
    {
        void IFornecedorRepository.Editar(Fornecedor model)
        {
            try
            {
                _repositoryBase.Editar(model);
            }
            catch(Exception ex)
            {
                throw;
            }
            
        }
        void IFornecedorRepository.Inserir(Fornecedor model)
        {
            try
            {
                _repositoryBase.Inserir(model);
            }
            catch(Exception ex)
            {
                throw;
            }
            
        }
        List<Fornecedor> IFornecedorRepository.Listar() => _repositoryBase.Listar();
        Fornecedor IFornecedorRepository.ObterPorId(int id) => _repositoryBase.ObterPorId(id);
        Fornecedor IFornecedorRepository.ObterPorGuid(Guid Guid) => _repositoryBase.ObterPorGuid(Guid);
        List<Fornecedor> IFornecedorRepository.Filtrar(Fornecedor model)
        {
            return _repositoryBase.Filtrar(x => string.IsNullOrEmpty(model.Nome) || x.Nome.Contains(model.Nome) 
            && string.IsNullOrEmpty(model.CNPJ) || x.CNPJ == model.CNPJ.Replace(".", "").Replace("/", "").Replace("-", "")
            && string.IsNullOrEmpty(model.Iniciais) || x.Nome.Contains(model.Iniciais.ToUpper()));
        }
    }
}
