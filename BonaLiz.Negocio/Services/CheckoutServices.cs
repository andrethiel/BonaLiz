using BonaLiz.Dados.Models;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.Services
{
    public class CheckoutServices(ICarrinhoServices _carrinhoServices, IVendaServices _vendaServices, IProdutoServices _produtoServices) : ICheckoutServices
    {
        public VendaViewModel Checkout(string carrinhoId)
        {
            try
            {
                var carrinho = _carrinhoServices.ObterPorId(carrinhoId);
                var carrinhoItem = _carrinhoServices.ObterItensPorId(carrinhoId);
                var produto = _produtoServices.Listar();

                var venda = new VendaViewModel
                {
                    ClienteId = carrinho.ClienteId.ToString(),
                    DataVenda = carrinho.DataCarrinho.ToString(),
                    VendaItensViewModel = carrinhoItem.Select(x => new VendaItensViewModel
                    {
                        ProdutoId = x.ProdutoId.ToString(),
                        Quantidade = x.Quantidade.ToString(),
                        Valor = string.Format("{0}", Convert.ToDecimal(produto.Where(y => y.Id == x.ProdutoId).FirstOrDefault().PrecoVenda.Replace("R$", "").Trim()) * x.Quantidade),
                    }).ToList()
                };

                var vendaEntity = _vendaServices.Inserir(venda);

                if (vendaEntity == null)
                {
                    return new VendaViewModel();
                }

                _carrinhoServices.Deletar(carrinhoId);

                return vendaEntity;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }
    }
}
