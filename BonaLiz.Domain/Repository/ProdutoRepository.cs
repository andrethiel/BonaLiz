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
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly DataContext _context;
        public ProdutoRepository(DataContext context)
        {
            _context = context;
        }

        public void Editar(Produto model)
        {
            if (string.IsNullOrEmpty(model.Codigo))
                Codigo(model);
            _context.Produto.Update(model);
            _context.SaveChanges();
        }

        public void Inserir(Produto model)
        {
            _context.Produto.Add(model);
            _context.SaveChanges();
            Codigo(model);
        }

        public List<Produto> Listar() => _context.Produto.ToList();

        public Produto ObterPorGuid(Guid guid) => _context.Produto.Where(x => x.Guid == guid).FirstOrDefault();

        public Produto ObterPorId(int id) => _context.Produto.Where(x => x.Id == id).FirstOrDefault();

        private void Codigo(Produto produto)
        {
            var listaCodigos = _context.Produto.Where(x => x.FornecedorId == produto.FornecedorId).Where(x => x.Codigo != "").ToList().OrderBy(x => x.Codigo).ToList();
            if(listaCodigos.Count > 0)
            {
                if(listaCodigos.Last().Codigo == null)
                {
                    produto.Codigo = string.Format("{0}{1}{2}", _context.Fornecedor.Where(x => x.Id == produto.FornecedorId).FirstOrDefault().Iniciais, "000", 1);
                }
                else
                {
                    var codigo = listaCodigos.Last().Codigo.Length == 6 ? listaCodigos.Last().Codigo.Substring(2) : listaCodigos.Last().Codigo.Substring(1);
                    var zeros = codigo.Split("0").SkipLast(1).ToArray();
                    var codigoInt = Convert.ToInt32(codigo) + 1;
                    var iniciais = _context.Fornecedor.Where(x => x.Id == produto.FornecedorId).FirstOrDefault().Iniciais.Trim();
                    iniciais = string.Format("{0}{1}", iniciais.PadRight(iniciais.Length + zeros.Length, '0'), codigoInt);

					produto.Codigo = iniciais;
                }
            }

            _context.Produto.Update(produto);
            _context.SaveChanges();
        }

        public List<Produto> Filtrar(Produto model) => _context.Produto
            .Where(x => string.IsNullOrEmpty(model.Nome) || x.Nome.Contains(model.Nome))
            .Where(x => model.FornecedorId == 0 || x.FornecedorId == model.FornecedorId)
            .Where(x => model.TipoProdutoId == 0 || x.TipoProdutoId == model.TipoProdutoId)
            .Where(x => model.DataCompra == null || x.DataCompra == model.DataCompra)
            .ToList();
            
    }
}
