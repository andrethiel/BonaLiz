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
    public class TipoProdutoRepository : ITipoProdutoRepository
    {
        private readonly DataContext _context;
        public TipoProdutoRepository(DataContext Context)
        {
            _context = Context;
        }

        public void Cadastrar(TipoProduto model)
        {
            try
            {
                _context.TipoProduto.Add(model);
                _context.SaveChanges();
            }
            catch (Exception ex) { }
            
        }

        public void Editar(TipoProduto model)
        {
            try
            {
                _context.TipoProduto.Update(model);
                _context.SaveChanges();
            }
            catch (Exception ex) { }   
        }

        public List<TipoProduto> Filtrar(TipoProduto model) => _context.TipoProduto.Where(x => string.IsNullOrEmpty(model.Nome) || x.Nome.Contains(model.Nome)).ToList();

        public List<TipoProduto> Listar() => _context.TipoProduto.ToList();

        public TipoProduto ObterPorGuid(Guid guid) => _context.TipoProduto.Where(x => x.Guid == guid).FirstOrDefault();

        public TipoProduto ObterPorId(int id) => _context.TipoProduto.Where(x => x.Id == id).FirstOrDefault();

    }
}
