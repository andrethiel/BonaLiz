using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace BonaLiz.Negocio.Services
{
    public class CarrinhoServices(ICarrinhoRepository _carrinhoRepository) : ICarrinhoServices
    {
        public void AlteraQuantidade(CarrinhoItensViewModel model)
        {
            var carrinho = _carrinhoRepository.ObterItensPorId(Guid.Parse(model.CarrinhoId));
            var carrinhoItem = carrinho.FirstOrDefault(x => x.ProdutoId == model.ProdutoId);
            carrinhoItem.Quantidade = model.Quantidade;
            _carrinhoRepository.Editar(carrinhoItem);
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

            if (carrinho.Count > 0)
            {
                foreach (var item in model)
                {
                    if (!carrinho.Any(x => x.ProdutoId == item.ProdutoId))
                    {
                        lista.Add(new CarrinhoItens
                        {
                            CarrinhoId = Guid.Parse(item.CarrinhoId),
                            ProdutoId = item.ProdutoId,
                            Quantidade = item.Quantidade,
                        });

                        _carrinhoRepository.InserirItens(lista);
                    }
                    else
                    {
                        var carrinhoItem = carrinho.FirstOrDefault(x => x.ProdutoId == item.ProdutoId);
                        carrinhoItem.Quantidade = carrinhoItem.Quantidade += item.Quantidade;
                        _carrinhoRepository.Editar(carrinhoItem);
                    }
                }
            }
            else
            {
                
                foreach (var item in model)
                {
                    lista.Add(new CarrinhoItens
                    {
                        CarrinhoId = Guid.Parse(item.CarrinhoId),
                        ProdutoId = item.ProdutoId,
                        Quantidade = item.Quantidade,
                    });
                }

                _carrinhoRepository.InserirItens(lista);
            }
        }
    }
}
