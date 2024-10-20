using AutoMapper;
using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.Services
{
    public class ProdutoServices : IProdutoServices
    {
        private readonly IProdutoRepository _produtoRepository;
        private readonly IFornecedorRepository _fornecedorRepository;
        private readonly ITipoProdutoRepository _tipoProdutoRepository;
        private readonly IMapper _mapper;
        public ProdutoServices(IProdutoRepository produtoRepository, IMapper mapper, ITipoProdutoRepository tipoProdutoRepository, IFornecedorRepository fornecedorRepository)
        {
            _produtoRepository = produtoRepository;
            _mapper = mapper;
            _tipoProdutoRepository = tipoProdutoRepository;
            _fornecedorRepository = fornecedorRepository;
        }
        public void Cadastrar(ProdutoViewModel model)
        {
            _produtoRepository.Inserir(_mapper.Map<Produto>(model));
        }

        public void Editar(ProdutoViewModel model)
        {
            var produto = _produtoRepository.ObterPorId(model.Id);
            produto.Id = model.Id;
            produto.Guid = model.Guid;
            produto.Nome = model.Nome;
            produto.TipoProdutoId = Convert.ToInt32(model.TipoProdutoId);
            produto.FornecedorId = Convert.ToInt32(model.FornecedorId);
            produto.PrecoCusto = Convert.ToDecimal(model.PrecoCusto);
            produto.PrecoVenda = Convert.ToDecimal(model.PrecoVenda);
            produto.Lucro = Convert.ToDecimal(model.Lucro);
            produto.DataCompra = Convert.ToDateTime(model.DataCompra);

            _produtoRepository.Editar(produto);
        }

        public List<ProdutoViewModel> Filtrar(ProdutoViewModel model) => _produtoRepository.Filtrar(_mapper.Map<Produto>(model)).Select(x => new ProdutoViewModel()
        {
            Id = x.Id,
            Guid = x.Guid,
            Nome = x.Nome,
            FornecedorId = x.FornecedorId.ToString(),
            TipoProdutoId = x.TipoProdutoId.ToString(),
            PrecoCusto = x.PrecoCusto.ToString("C"),
            PrecoVenda = x.PrecoVenda.ToString("C"),
            Lucro = x.Lucro.ToString("C"),
            DataCompra = x.DataCompra.Value.ToString("dd/MM/yyyy"),
            NomeFornecedor = _fornecedorRepository.ObterPorId(x.FornecedorId).Nome,
            TipoProduto = _tipoProdutoRepository.ObterPorId(x.TipoProdutoId).Nome,
            Codigo = x.Codigo
            
        }).ToList();

        public List<ProdutoViewModel> Listar() => _produtoRepository.Listar().Select(x => new ProdutoViewModel()
        {
            Id = x.Id,
            Guid = x.Guid,
            Nome = x.Nome,
            FornecedorId=x.FornecedorId.ToString(),
            TipoProdutoId=x.TipoProdutoId.ToString(),
            PrecoCusto = x.PrecoCusto.ToString("C"),
            PrecoVenda = x.PrecoVenda.ToString("C"),
            Lucro = x.Lucro.ToString("C"),
            DataCompra = x.DataCompra.Value.ToString("dd/MM/yyyy"),
            NomeFornecedor = _fornecedorRepository.ObterPorId(x.FornecedorId).Nome,
            TipoProduto = _tipoProdutoRepository.ObterPorId(x.TipoProdutoId).Nome,
            Codigo = x.Codigo
        }).ToList();

        public ProdutoViewModel ObterPorGuid(Guid guid)
        {
            var produto = _produtoRepository.ObterPorGuid(guid);
            return new ProdutoViewModel()
            {
                Id = produto.Id,
                Guid = produto.Guid,
                Nome = produto.Nome,
                FornecedorId = produto.FornecedorId.ToString(),
                TipoProdutoId = produto.TipoProdutoId.ToString(),
                PrecoCusto = produto.PrecoCusto.ToString("C"),
                PrecoVenda = produto.PrecoVenda.ToString("C"),
                Lucro = produto.Lucro.ToString("C"),
                DataCompra = produto.DataCompra.Value.ToString("dd/MM/yyyy"),
                Codigo = produto.Codigo
            };
        }

        public ProdutoViewModel ObterPorId(int id)
        {
            var produto = _produtoRepository.ObterPorId(id);
            return new ProdutoViewModel()
            {
                Id = produto.Id,
                Guid = produto.Guid,
                Nome = produto.Nome,
                FornecedorId = produto.FornecedorId.ToString(),
                TipoProdutoId = produto.TipoProdutoId.ToString(),
                PrecoCusto = produto.PrecoCusto.ToString("C"),
                PrecoVenda = produto.PrecoVenda.ToString("C"),
                Lucro = produto.Lucro.ToString("C"),
                DataCompra = produto.DataCompra.Value.ToString("dd/MM/yyyy")
            };
        }
    }
}
