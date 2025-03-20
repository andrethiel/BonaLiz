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
        Fornecedor IFornecedorRepository.Editar(Fornecedor model)
        {
            try
            {
                return _repositoryBase.Editar(model);
            }
            catch(Exception ex)
            {
                throw;
            }
            
        }
        Fornecedor IFornecedorRepository.Inserir(Fornecedor model)
        {
            try
            {
                model.Id = _repositoryBase.InserirScalar(model);
                return model;
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
            Console.Write(model.Nome == "");
            var cnpj = model.CNPJ.Replace(".", "").Replace("/", "").Replace("-", "");
            return _repositoryBase.Listar()
                .Where(x => string.IsNullOrEmpty(model.CNPJ) || x.CNPJ == cnpj)
                .Where(x => string.IsNullOrEmpty(model.Nome) || x.Nome.ToUpper().Contains(model.Nome.ToUpper())).ToList();
        }
    }
}
