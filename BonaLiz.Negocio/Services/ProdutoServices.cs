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
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;
using System.Text.Json;
using Newtonsoft.Json;
using Microsoft.IdentityModel.Logging;

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
        public ProdutoViewModel Cadastrar(ProdutoViewModel model)
        {
            try
            {
                var produto = new Produto();
                produto.Guid = Guid.NewGuid();
                produto.Nome = model.Nome;
                produto.TipoProdutoId = Convert.ToInt32(model.TipoProdutoId);
                produto.FornecedorId = Convert.ToInt32(model.FornecedorId);
                produto.PrecoCusto = Convert.ToDecimal(model.PrecoCusto.Replace("R$", "").Trim());
                produto.PrecoVenda = Convert.ToDecimal(model.PrecoVenda.Replace("R$", "").Trim());
                produto.Lucro = Convert.ToDecimal(model.Lucro.Replace("R$", "").Trim());
                produto.DataCompra = string.IsNullOrEmpty(model.DataCompra) ?  Convert.ToDateTime(model.DataCompra) : null;
                produto.Quantidade = Convert.ToInt32(model.Quantidade);
                produto.Inativo = false;
                var produtoEntity = _produtoRepository.Inserir(produto);

                if (model.Arquivo.Count() > 0)
                {
                    _imagemServices.Inserir(model.Arquivo, produto.Id);
                }

                return new ProdutoViewModel()
                {
                    Id = produtoEntity.Id,
                    Guid = produtoEntity.Guid,
                    Nome = produtoEntity.Nome,
                    FornecedorId = produtoEntity.FornecedorId.ToString(),
                    TipoProdutoId = produtoEntity.TipoProdutoId.ToString(),
                    PrecoCusto = Formater.FormatarMoeda(produtoEntity.PrecoCusto),
                    PrecoVenda = Formater.FormatarMoeda(produtoEntity.PrecoVenda),
                    Lucro = Formater.FormatarMoeda(produtoEntity.Lucro),
                    DataCompra = produtoEntity.DataCompra.Value.ToString("dd/MM/yyyy"),
                    Quantidade = produtoEntity.Quantidade.ToString(),
                    Inativo = produtoEntity.Inativo.ToString(),
                };
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public ProdutoViewModel Editar(ProdutoViewModel model)
        {

            var produto = _produtoRepository.ObterPorId(model.Id);
            produto.Id = model.Id;
            produto.Guid = model.Guid.Value;
            produto.Nome = model.Nome;
            produto.TipoProdutoId = Convert.ToInt32(model.TipoProdutoId);
            produto.FornecedorId = Convert.ToInt32(model.FornecedorId);
            produto.PrecoCusto = Convert.ToDecimal(model.PrecoCusto.Replace("R$", "").Trim());
            produto.PrecoVenda = Convert.ToDecimal(model.PrecoVenda.Replace("R$", "").Trim());
            produto.Lucro = Convert.ToDecimal(model.Lucro.Replace("R$", "").Trim());
            produto.DataCompra = Convert.ToDateTime(model.DataCompra);
            produto.Quantidade = Convert.ToInt32(model.Quantidade);
            produto.Inativo = Convert.ToBoolean(model.Inativo);

            var produtoEntity = _produtoRepository.Editar(produto);

            var arquivos = new List<ImagemProdutoViewModel>();

            if (model.Imagem == null)
            {
                arquivos = _imagemServices.Listar().Where(x => x.ProdutoId == produto.Id).ToList();
                foreach (var item in arquivos)
                {
                    _imagemServices.Remover(item);
                    Arquivo.DeletaArquivo(item.NomeArquivo);
                }
            }
            else
            {
                var imagens = JsonConvert.DeserializeObject<List<ImagemProdutoViewModel>>(model.Imagem);
                arquivos = _imagemServices.Listar().Where(x => x.ProdutoId == produto.Id).ToList();

                foreach (var item in arquivos)
                {
                    var arquivo = imagens.FirstOrDefault(x => Arquivo.RemoveURL(x.NomeArquivo) == item.NomeArquivo.Trim());
                    if (arquivo == null)
                    {
                        _imagemServices.Remover(item);
                        Arquivo.DeletaArquivo(item.NomeArquivo);
                    }
                }
            }

            if (model.Arquivo != null)
            {
                _imagemServices.Inserir(model.Arquivo, produto.Id);
            }

            return new ProdutoViewModel()
            {
                Id = produtoEntity.Id,
                Guid = produtoEntity.Guid,
                Nome = produtoEntity.Nome,
                FornecedorId = produtoEntity.FornecedorId.ToString(),
                TipoProdutoId = produtoEntity.TipoProdutoId.ToString(),
                PrecoCusto = Formater.FormatarMoeda(produtoEntity.PrecoCusto),
                PrecoVenda = Formater.FormatarMoeda(produtoEntity.PrecoVenda),
                Lucro = Formater.FormatarMoeda(produtoEntity.Lucro),
                DataCompra = produtoEntity.DataCompra.Value.ToString("dd/MM/yyyy"),
                Quantidade = produtoEntity.Quantidade.ToString(),
                Inativo = produtoEntity.Inativo.ToString(),
            };
        }

        public List<ProdutoViewModel> Filtrar(ProdutoViewModel model)
        {
            var produto = new Produto
            {
                Nome = string.IsNullOrEmpty(model.Nome) ? null : model.Nome,
                FornecedorId = string.IsNullOrEmpty(model.FornecedorId) ? null : Convert.ToInt32(model.FornecedorId),
                TipoProdutoId = string.IsNullOrEmpty(model.TipoProdutoId) ? null : Convert.ToInt32(model.TipoProdutoId),
                DataCompra = string.IsNullOrEmpty(model.DataCompra) ? null : Convert.ToDateTime(model.DataCompra)
            };

            var produtos = _produtoRepository.Filtrar(produto);

            if(produtos.Count > 0)
            {
                var imagens = _imagemServices.Listar();
                var fornecedores = _fornecedorRepository.Listar();
                var tipoProdutos = _tipoProdutoRepository.Listar();

                return produtos.Select(x => new ProdutoViewModel()
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
                    Quantidade = x.Quantidade.ToString(),
                    Inativo = x.Inativo.ToString(),

                    UrlImagem = Arquivo.FormataNomeURL(imagens.Where(y => y.ProdutoId == x.Id).ToList(), _httpContextAccessor)
                }).ToList();
            }

            return new List<ProdutoViewModel>();
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
