using AutoMapper;
using BonaLiz.Negocio.Helpers;
using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.Utils;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
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
		private readonly IHttpContextAccessor _httpContextAccessor;
		public ProdutoServices(IProdutoRepository produtoRepository, IMapper mapper, ITipoProdutoRepository tipoProdutoRepository, IFornecedorRepository fornecedorRepository, IHttpContextAccessor httpContextAccessor)
		{
			_produtoRepository = produtoRepository;
			_mapper = mapper;
			_tipoProdutoRepository = tipoProdutoRepository;
			_fornecedorRepository = fornecedorRepository;
			_httpContextAccessor = httpContextAccessor;
		}
		public void Cadastrar(ProdutoViewModel model)
        {
            var custo = model.PrecoCusto.Replace("R$", "").Trim();
            var venda = model.PrecoVenda.Replace("R$", "").Trim();
            var lucro = model.Lucro.Replace("R$", "").Trim();
			model.PrecoCusto = custo;
			model.PrecoVenda = venda;
            model.Lucro = lucro;
			model.Imagem = model.Arquivo != null ? Arquivo.Imagem(model.Arquivo) : "";
			_produtoRepository.Inserir(_mapper.Map<Produto>(model));
        }

        public void Editar(ProdutoViewModel model)
        {
			
			var produto = _produtoRepository.ObterPorId(model.Id);
			model.Imagem = model.Arquivo != null ? Arquivo.Imagem(model.Arquivo) : produto.Arquivo;
			produto.Id = model.Id;
            produto.Guid = model.Guid;
            produto.Nome = model.Nome;
            produto.TipoProdutoId = Convert.ToInt32(model.TipoProdutoId);
            produto.FornecedorId = Convert.ToInt32(model.FornecedorId);
            produto.PrecoCusto = Convert.ToDouble(model.PrecoCusto.Replace("R$", "").Trim());
            produto.PrecoVenda = Convert.ToDecimal(model.PrecoVenda.Replace("R$", "").Trim());
            produto.Lucro = Convert.ToDecimal(model.Lucro.Replace("R$", "").Trim());
            produto.DataCompra = Convert.ToDateTime(model.DataCompra);
            produto.Quantidade = Convert.ToInt32(model.Quantidade);
            produto.Inativo = Convert.ToBoolean(model.Inativo);
			produto.Arquivo = model.Imagem;
            

            _produtoRepository.Editar(produto);
        }

        public List<ProdutoViewModel> Filtrar(ProdutoViewModel model) => _produtoRepository.Filtrar(_mapper.Map<Produto>(model)).Select(x => new ProdutoViewModel()
        {
            Id = x.Id,
            Guid = x.Guid,
            Nome = x.Nome,
            FornecedorId = x.FornecedorId.ToString(),
            TipoProdutoId = x.TipoProdutoId.ToString(),
            PrecoCusto = Formater.FormatarMoeda(x.PrecoCusto),
            //PrecoVenda = Formater.FormatarMoeda(x.PrecoVenda),
            //Lucro = Formater.FormatarMoeda(x.Lucro),
			DataCompra = x.DataCompra.Value.ToString("dd/MM/yyyy"),
            NomeFornecedor = _fornecedorRepository.ObterPorId(x.FornecedorId).Nome,
            TipoProduto = _tipoProdutoRepository.ObterPorId(x.TipoProdutoId).Nome,
            Codigo = x.Codigo,
            Quantidade = x.Quantidade.ToString(),
            Inativo = x.Inativo.ToString(),

			UrlImagem = !string.IsNullOrWhiteSpace(x.Arquivo) ? Arquivo.FormataNomeURL(x.Arquivo, _httpContextAccessor) : ""
		}).ToList();

        public List<ProdutoViewModel> Listar() => _produtoRepository.Listar().Select(x => new ProdutoViewModel()
        {
            Id = x.Id,
            Guid = x.Guid,
            Nome = x.Nome,
            FornecedorId=x.FornecedorId.ToString(),
            TipoProdutoId=x.TipoProdutoId.ToString(),
            PrecoCusto = Formater.FormatarMoeda(x.PrecoCusto),
			//PrecoVenda = Formater.FormatarMoeda(x.PrecoVenda),
   //         Lucro = Formater.FormatarMoeda(x.Lucro),
			DataCompra = x.DataCompra.Value.ToString("dd/MM/yyyy"),
            NomeFornecedor = _fornecedorRepository.ObterPorId(x.FornecedorId).Nome,
            TipoProduto = _tipoProdutoRepository.ObterPorId(x.TipoProdutoId).Nome,
            Codigo = x.Codigo,
			Quantidade = x.Quantidade.ToString(),
			Inativo = x.Inativo.ToString(),
			UrlImagem = !string.IsNullOrWhiteSpace(x.Arquivo) ? Arquivo.FormataNomeURL(x.Arquivo, _httpContextAccessor) : ""
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
                PrecoCusto = Formater.FormatarMoeda(produto.PrecoCusto),
                //PrecoVenda = Formater.FormatarMoeda(produto.PrecoVenda),
                //Lucro = Formater.FormatarMoeda(produto.Lucro),
                DataCompra = produto.DataCompra.Value.ToString("dd/MM/yyyy"),
                Codigo = produto.Codigo,
				Quantidade = produto.Quantidade.ToString(),
				Inativo = produto.Inativo.ToString(),

				UrlImagem = !string.IsNullOrWhiteSpace(produto.Arquivo) ? Arquivo.FormataNomeURL(produto.Arquivo, _httpContextAccessor) : ""
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
                PrecoCusto = Formater.FormatarMoeda(produto.PrecoCusto),
				//PrecoVenda = Formater.FormatarMoeda(produto.PrecoVenda),
    //            Lucro = Formater.FormatarMoeda(produto.Lucro),
                DataCompra = produto.DataCompra.Value.ToString("dd/MM/yyyy"),
				Codigo = produto.Codigo,
				Quantidade = produto.Quantidade.ToString(),
				Inativo = produto.Inativo.ToString(),
				UrlImagem = !string.IsNullOrWhiteSpace(produto.Arquivo) ? Arquivo.FormataNomeURL(produto.Arquivo, _httpContextAccessor) : ""
			};
        }
    }
}
