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
using static System.Net.Mime.MediaTypeNames;
using Microsoft.EntityFrameworkCore;

namespace BonaLiz.Negocio.Services
{
    public class ProdutoServices : IProdutoServices
    {
        private readonly IProdutoRepository _produtoRepository;
        private readonly IFornecedorRepository _fornecedorRepository;
        private readonly ITipoProdutoRepository _tipoProdutoRepository;
        private readonly IMapper _mapper;
		private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IImagemServices _imagemServices;
        public ProdutoServices(IProdutoRepository produtoRepository, IMapper mapper, ITipoProdutoRepository tipoProdutoRepository, IFornecedorRepository fornecedorRepository, IHttpContextAccessor httpContextAccessor, IImagemServices imagemServices)
        {
            _produtoRepository = produtoRepository;
            _mapper = mapper;
            _tipoProdutoRepository = tipoProdutoRepository;
            _fornecedorRepository = fornecedorRepository;
            _httpContextAccessor = httpContextAccessor;
            _imagemServices = imagemServices;
        }
        public void Cadastrar(ProdutoViewModel model)
        {
            try
            {
                var produto = new Produto();
                produto.Guid = Guid.NewGuid();
				//model.Imagem = model.Arquivo != null ? Arquivo.Imagem(model.Arquivo) : "";
				produto.Nome = model.Nome;
				produto.TipoProdutoId = Convert.ToInt32(model.TipoProdutoId);
				produto.FornecedorId = Convert.ToInt32(model.FornecedorId);
				produto.PrecoCusto = Convert.ToDecimal(model.PrecoCusto.Replace("R$", "").Trim());
				produto.PrecoVenda = Convert.ToDecimal(model.PrecoVenda.Replace("R$", "").Trim());
				produto.Lucro = Convert.ToDecimal(model.Lucro.Replace("R$", "").Trim());
				produto.DataCompra = Convert.ToDateTime(model.DataCompra);
				produto.Quantidade = Convert.ToInt32(model.Quantidade);
				produto.Inativo = Convert.ToBoolean(model.Inativo);
				produto.Codigo = "";
				_produtoRepository.Inserir(produto);

                //Codigo(model);

                if (model.Arquivo.Count() > 0)
                {
                    _imagemServices.Inserir(model.Arquivo, produto.Id);
                }
			}
            catch(Exception ex)
            {
                throw;
            }
            
        }

        public void Editar(ProdutoViewModel model)
        {
			
			var produto = _produtoRepository.ObterPorId(model.Id);
			produto.Id = model.Id;
            produto.Guid = model.Guid;
            produto.Nome = model.Nome;
            produto.TipoProdutoId = Convert.ToInt32(model.TipoProdutoId);
            produto.FornecedorId = Convert.ToInt32(model.FornecedorId);
            produto.PrecoCusto = Convert.ToDecimal(model.PrecoCusto.Replace("R$", "").Trim());
            produto.PrecoVenda = Convert.ToDecimal(model.PrecoVenda.Replace("R$", "").Trim());
            produto.Lucro = Convert.ToDecimal(model.Lucro.Replace("R$", "").Trim());
            produto.DataCompra = Convert.ToDateTime(model.DataCompra);
            produto.Quantidade = Convert.ToInt32(model.Quantidade);
            produto.Inativo = Convert.ToBoolean(model.Inativo);            

            _produtoRepository.Editar(produto);
            //if (string.IsNullOrEmpty(model.Codigo))
                //Codigo(model);


                //if (model.Arquivo.Count() > 0)
                //{
                //    _imagemServices.Inserir(model.Arquivo, produto.Id);
                //}
        }

        public List<ProdutoViewModel> Filtrar(ProdutoViewModel model)
        {
            var imagens = _imagemServices.Listar();
            var fornecedores = _fornecedorRepository.Listar();
            var tipoProdutos = _tipoProdutoRepository.Listar();

            return _produtoRepository.Filtrar(_mapper.Map<Produto>(model)).Select(x => new ProdutoViewModel()
            {
                Id = x.Id,
                Guid = x.Guid,
                Nome = x.Nome,
                FornecedorId = x.FornecedorId.ToString(),
                TipoProdutoId = x.TipoProdutoId.ToString(),
                PrecoCusto = Formater.FormatarMoeda(x.PrecoCusto),
                PrecoVenda = Formater.FormatarMoeda(x.PrecoVenda),
                Lucro = Formater.FormatarMoeda(x.Lucro),
                DataCompra = x.DataCompra.Value.ToString("dd/MM/yyyy"),
                NomeFornecedor = fornecedores.Where(y => y.Id == x.FornecedorId).First().Nome,
                TipoProduto = tipoProdutos.Where(y => y.Id == x.TipoProdutoId).First().Nome,
                Codigo = x.Codigo,
                Quantidade = x.Quantidade.ToString(),
                Inativo = x.Inativo.ToString(),

                UrlImagem = Arquivo.FormataNomeURL(imagens.Where(y => y.ProdutoId == x.Id).ToList(), _httpContextAccessor)
            }).ToList();
        }

        public List<ProdutoViewModel> Listar(ProdutoViewModel model)
        {
            var imagens = _imagemServices.Listar();
            var fornecedores = _fornecedorRepository.Listar();
            var tipoProdutos = _tipoProdutoRepository.Listar();

            return _produtoRepository.Listar().Where(x => x.Inativo == Convert.ToBoolean(model.Inativo)).Select(x => new ProdutoViewModel()
            {
                Id = x.Id,
                Guid = x.Guid,
                Nome = x.Nome,
                FornecedorId = x.FornecedorId.ToString(),
                TipoProdutoId = x.TipoProdutoId.ToString(),
                PrecoCusto = Formater.FormatarMoeda(x.PrecoCusto),
                PrecoVenda = Formater.FormatarMoeda(x.PrecoVenda),
                Lucro = Formater.FormatarMoeda(x.Lucro),
                DataCompra = x.DataCompra.Value.ToString("dd/MM/yyyy"),
                NomeFornecedor = fornecedores.Where(y => y.Id == x.FornecedorId).First().Nome,
                TipoProduto = tipoProdutos.Where(y => y.Id == x.TipoProdutoId).First().Nome,
                Codigo = x.Codigo,
                Quantidade = x.Quantidade.ToString(),
                Inativo = x.Inativo.ToString(),
                UrlImagem = Arquivo.FormataNomeURL(imagens.Where(y => y.ProdutoId == x.Id).ToList(), _httpContextAccessor)
            }).ToList();
        }

        public ProdutoViewModel ObterPorGuid(Guid guid)
        {
            var produto = _produtoRepository.ObterPorGuid(guid);

            var imagens = _imagemServices.Listar();
            return new ProdutoViewModel()
            {
                Id = produto.Id,
                Guid = produto.Guid,
                Nome = produto.Nome,
                FornecedorId = produto.FornecedorId.ToString(),
                TipoProdutoId = produto.TipoProdutoId.ToString(),
                PrecoCusto = Formater.FormatarMoeda(produto.PrecoCusto),
                PrecoVenda = Formater.FormatarMoeda(produto.PrecoVenda),
                Lucro = Formater.FormatarMoeda(produto.Lucro),
                DataCompra = produto.DataCompra.Value.ToString("dd/MM/yyyy"),
                Codigo = produto.Codigo,
				Quantidade = produto.Quantidade.ToString(),
                Inativo = produto.Inativo.ToString(),

                UrlImagem = Arquivo.FormataNomeURL(imagens.Where(y => y.ProdutoId == produto.Id).ToList(), _httpContextAccessor)
            };
        }

        public ProdutoViewModel ObterPorId(int id)
        {
            var produto = _produtoRepository.ObterPorId(id);
            var imagens = _imagemServices.Listar();
            return new ProdutoViewModel()
            {
                Id = produto.Id,
                Guid = produto.Guid,
                Nome = produto.Nome,
                FornecedorId = produto.FornecedorId.ToString(),
                TipoProdutoId = produto.TipoProdutoId.ToString(),
                PrecoCusto = Formater.FormatarMoeda(produto.PrecoCusto),
                PrecoVenda = Formater.FormatarMoeda(produto.PrecoVenda),
                Lucro = Formater.FormatarMoeda(produto.Lucro),
                DataCompra = produto.DataCompra.Value.ToString("dd/MM/yyyy"),
				Codigo = produto.Codigo,
				Quantidade = produto.Quantidade.ToString(),
				Inativo = produto.Inativo.ToString(),
                UrlImagem = Arquivo.FormataNomeURL(imagens.Where(y => y.ProdutoId == produto.Id).ToList(), _httpContextAccessor)
            };
        }

        public List<ProdutoViewModel> ListarPrincipal(ProdutoViewModel model)
        {
            var imagens = _imagemServices.Listar();

            return _produtoRepository.Listar().Where(x => x.Inativo == Convert.ToBoolean(model.Inativo))
            .Select(x => new ProdutoViewModel()
            {
                Id = x.Id,
                Quantidade = x.Quantidade.ToString(),
                Nome = x.Nome,
                PrecoVenda = Formater.FormatarMoeda(x.PrecoVenda),
                Codigo = x.Codigo,
                UrlImagem = Arquivo.FormataNomeURL(imagens.Where(y => y.ProdutoId == x.Id).ToList(), _httpContextAccessor)
            })
            .ToList();
        }

        //private void Codigo(Produto produto)
        //{
        //    var lista = Listar();
        //    var listaCodigos = lista.Where(x => x.FornecedorId == produto.FornecedorId).Where(x => x.Codigo != "").ToList().OrderBy(x => x.Codigo).ToList();
        //    if (listaCodigos.Count > 0)
        //    {
        //        var codigo = listaCodigos.Last().Codigo.Length == 6 ? listaCodigos.Last().Codigo.Substring(2) : listaCodigos.Last().Codigo.Substring(1);
        //        var zeros = codigo.Split("0").SkipLast(1).ToArray();
        //        var codigoInt = Convert.ToInt32(codigo) + 1;
        //        var iniciais = _context.Fornecedor.Where(x => x.Id == produto.FornecedorId).FirstOrDefault().Iniciais.Trim();
        //        iniciais = string.Format("{0}{1}", iniciais.PadRight(iniciais.Length + zeros.Length, '0'), codigoInt);

        //        produto.Codigo = iniciais;

        //    }
        //    else
        //    {
        //        produto.Codigo = string.Format("{0}{1}{2}", _context.Fornecedor.Where(x => x.Id == produto.FornecedorId).FirstOrDefault().Iniciais, "000", 1);
        //    }

        //    _context.Produto.Update(produto);
        //    _context.SaveChanges();
        //}
    }
}
