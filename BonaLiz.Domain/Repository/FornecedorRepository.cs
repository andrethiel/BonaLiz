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
    public class FornecedorRepository : IFornecedorRepository
    {
        private readonly DataContext _context;
        public FornecedorRepository(DataContext context)
        {
            _context = context;
        }
        void IFornecedorRepository.Editar(Fornecedor model)
        {
            try
            {
                _context.Fornecedor.Update(model);
                _context.SaveChanges();
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
                _context.Fornecedor.Add(model);
                _context.SaveChanges();
            }
            catch(Exception ex)
            {
                throw;
            }
            
        }
        List<Fornecedor> IFornecedorRepository.Listar() => _context.Fornecedor.ToList();
        Fornecedor IFornecedorRepository.ObterPorId(int id) => _context.Fornecedor.Where(x => x.Id == id).FirstOrDefault();
        Fornecedor IFornecedorRepository.ObterPorGuid(Guid Guid) => _context.Fornecedor.Where(x => x.Guid == Guid).FirstOrDefault();
        List<Fornecedor> IFornecedorRepository.Filtrar(Fornecedor model)
        {
            return _context.Fornecedor
                .Where(x => string.IsNullOrEmpty(model.Nome) || x.Nome.Contains(model.Nome))
                .Where(x => string.IsNullOrEmpty(model.CNPJ) || x.CNPJ == model.CNPJ.Replace(".", "").Replace("/", "").Replace("-", ""))
                .Where(x => string.IsNullOrEmpty(model.Iniciais) || x.Nome.Contains(model.Iniciais.ToUpper()))
                .ToList();
        }
    }
}
