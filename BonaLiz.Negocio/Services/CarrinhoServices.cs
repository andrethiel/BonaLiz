using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using BonaLiz.Domain.Repository;
using BonaLiz.Negocio.Helpers;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.Utils;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;

namespace BonaLiz.Negocio.Services
{
    public class CarrinhoServices(ICarrinhoRepository _carrinhoRepository, IProdutoRepository _produtoRepository,
        IClienteServices _clienteServices, IImagemRepository _imagemRepository, IVendaRepository _vendaRepository,
         IHttpContextAccessor _httpContextAccessor) : ICarrinhoServices
    {
        public void AlteraQuantidade(CarrinhoItensViewModel model)
        {
            var carrinho = _carrinhoRepository.ObterItensPorId(Guid.Parse(model.CarrinhoId));
            var carrinhoItem = carrinho.FirstOrDefault(x => x.ProdutoId == model.ProdutoId);
            carrinhoItem.Quantidade = model.Quantidade;
            _carrinhoRepository.Editar(carrinhoItem);
        }

        public void Deletar(string carrinhoId)
        {
            var carrinhoItens = _carrinhoRepository.ObterItensPorId(Guid.Parse(carrinhoId));
            if (carrinhoItens.Count > 0)
            {
                foreach (var item in carrinhoItens)
                {
                    _carrinhoRepository.Deletar(item);
                }
            }
            _carrinhoRepository.DeletarCarrinho(Guid.Parse(carrinhoId));
        }

        public void DeletarItem(CarrinhoItensViewModel model)
        {
            var carrinho = _carrinhoRepository.ObterItensPorId(Guid.Parse(model.CarrinhoId));
            var carrinhoItem = carrinho.FirstOrDefault(x => x.ProdutoId == model.ProdutoId);

            _carrinhoRepository.Deletar(new CarrinhoItens()
            {
                Id = carrinhoItem.Id,
                CarrinhoId = Guid.Parse(model.CarrinhoId),
                ProdutoId = model.ProdutoId
            });
        }

        public void Inserir(List<CarrinhoItensViewModel> model)
        {
            var carrinho = _carrinhoRepository.ObterItensPorId(Guid.Parse(model[0].CarrinhoId));
            var lista = new List<CarrinhoItens>();

            foreach (var item in model)
            {
                if (!carrinho.Any(x => x.ProdutoId == item.ProdutoId))
                {
                    var itens = new CarrinhoItens
                    {
                        CarrinhoId = Guid.Parse(item.CarrinhoId),
                        ProdutoId = item.ProdutoId,
                        Quantidade = item.Quantidade,
                    };

                    _carrinhoRepository.InserirItens(itens);
                }
                //else
                //{
                //    var carrinhoItem = carrinho.FirstOrDefault(x => x.ProdutoId == item.ProdutoId);
                //    carrinhoItem.Quantidade = carrinhoItem.Quantidade += item.Quantidade;
                //    _carrinhoRepository.Editar(carrinhoItem);
                //}
            }
        }

        public List<CarrinhoViewModel> ListarCarrinhos()
        {
            var carrinho = _carrinhoRepository.ListarCarrinho();
            var clientes = _clienteServices.Listar();
            var itens = _carrinhoRepository.ListarItens();

            return carrinho.Select(x => new CarrinhoViewModel
            {
                CarrinhoId = x.CarrinhoId.ToString(),
                NomeCliente = clientes.FirstOrDefault(c => c.Id == x.ClienteId)?.Nome,
                DataCarrinho = x.DataCarrinho.ToString("dd/MM/yyyy"),
                Quantidade = itens.Where(y => y.CarrinhoId == x.CarrinhoId).Sum(y => y.Quantidade)
            }).ToList();
        }

        //public List<CarrinhoItensViewModel> ListarItensCarrinhos(Guid id)
        //{
        //    var itens = _carrinhoRepository.ObterItensPorId(id);
        //    var clientes = _clienteRepository.Listar();
        //    var produtos = _produtoRepository.Listar();
        //    var imagens = _imagemRepository.Listar();

        //    return itens.Select(x => new CarrinhoItensViewModel
        //    {
        //        NomeCliente = clientes.Where(y => y.Id == x.cl)
        //    })
        //}

        public List<CarrinhoItensViewModel> ObterItensPorId(string carrinhoId)
        {
            var venda = _vendaRepository.ObterPorGuid(Guid.Parse(carrinhoId));
            if(venda != null)
            {
                throw new Exception("O carrinho ja esta vendido");
            }

            var carrinho = _carrinhoRepository.ObterCarrinhoId(Guid.Parse(carrinhoId));
            var carrinhoItens = _carrinhoRepository.ObterItensPorId(Guid.Parse(carrinhoId));
            var produtos = _produtoRepository.Listar();
            var imagens = _imagemRepository.Listar();
            var cliente = _clienteServices.ObterPorId(carrinho.ClienteId);

            return carrinhoItens.Select(x => new CarrinhoItensViewModel
            {
                CarrinhoId = x.CarrinhoId.ToString(),
                Quantidade = x.Quantidade,
                NomeProduto = produtos.Where(y => y.Id == x.ProdutoId).FirstOrDefault().Nome,
                EmailCliente = cliente.Email,
                NomeCliente = cliente.Nome,
                TelefoneCliente = cliente.Telefone,
                Valor = Formater.FormatarMoeda(produtos.Where(y => y.Id == x.ProdutoId).FirstOrDefault().PrecoVenda),
                imagemProduto = Arquivo.FormataURL(imagens.Where(y => y.ProdutoId == x.ProdutoId).FirstOrDefault().NomeImagem, _httpContextAccessor)
            }).ToList();
        }

        public CarrinhoIdViewModel ObterPorId(string carrinhoId)
        {
            var carrinho = _carrinhoRepository.ObterCarrinhoId(Guid.Parse(carrinhoId));

            return new CarrinhoIdViewModel
            {
                CarrinhoId = carrinho.CarrinhoId.ToString(),
                ClienteId = carrinho.ClienteId,
                DataCarrinho = carrinho.DataCarrinho
            };
        }
    }
}
