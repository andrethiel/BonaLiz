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
    public class ClienteCarrinhoServices(IClienteRepository _clienteRepository, ICarrinhoRepository _carrinhoRepository) : IClienteCarrinhoServices
    {
        public CarrinhoIdViewModel Inserir(ClienteViewModel model)
        {
            var cliente = _clienteRepository.Listar().Where(x => x.Nome == model.Nome && x.Telefone == model.Telefone).ToList();
            

            if (cliente.Count == 0)
            {
                var clienteId = _clienteRepository.Inserir(new Cliente()
                {
                    Guid = Guid.NewGuid(),
                    Nome = model.Nome,
                    Email = model.Email,
                    Telefone = model.Telefone,
                    Inativo = false
                });
                var carrinhoInserir = new Carrinho()
                {
                    CarrinhoId = Guid.NewGuid(),
                    ClienteId = clienteId,
                    DataCarrinho = DateTime.Now
                };

                _carrinhoRepository.Inserir(carrinhoInserir);

                return new CarrinhoIdViewModel()
                {
                    CarrinhoId = carrinhoInserir.CarrinhoId.ToString()
                };
            }

            var carrinho = _carrinhoRepository.ObterPorClienteId(cliente.FirstOrDefault().Id);

            if(carrinho.DataCarrinho < Convert.ToDateTime(DateTime.Now.ToString("00:00:00")))
            {
                var carrinhoInserir = new Carrinho()
                {
                    CarrinhoId = Guid.NewGuid(),
                    ClienteId = cliente.FirstOrDefault().Id,
                    DataCarrinho = DateTime.Now
                };

                _carrinhoRepository.Inserir(carrinhoInserir);

                return new CarrinhoIdViewModel()
                {
                    CarrinhoId = carrinhoInserir.CarrinhoId.ToString()
                };
            }

            return new CarrinhoIdViewModel()
            {
                CarrinhoId = carrinho.CarrinhoId.ToString()
            };
        }
    }
}
