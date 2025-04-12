using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;

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

        public List<Carrinho> ListarCarrinhos() => _carrinhoRepository.ListarCarrinho();

        public List<CarrinhoItensViewModel> ObterItensPorId(string carrinhoId)
        {
            var carrinhoItens = _carrinhoRepository.ObterItensPorId(Guid.Parse(carrinhoId));

            return carrinhoItens.Select(x => new CarrinhoItensViewModel
            {
                CarrinhoId = x.CarrinhoId.ToString(),
                ProdutoId = x.ProdutoId,
                Quantidade = x.Quantidade,
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
