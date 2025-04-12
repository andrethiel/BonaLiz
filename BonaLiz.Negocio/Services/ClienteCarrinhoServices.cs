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
            var cliente = _clienteRepository.Listar().Where(x => x.Telefone == model.Telefone).FirstOrDefault();

            if (cliente == null)
            {
                var clienteEntity = _clienteRepository.Inserir(new Cliente()
                {
                    Id = model.Id,
                    Guid = Guid.NewGuid(),
                    Nome = model.Nome,
                    Email = model.Email,
                    Telefone = model.Telefone,
                    Inativo = false
                });
                var carrinhoInserir = new Carrinho()
                {
                    CarrinhoId = Guid.NewGuid(),
                    ClienteId = clienteEntity.Id,
                    DataCarrinho = DateTime.Now
                };

                _carrinhoRepository.Inserir(carrinhoInserir);

                return new CarrinhoIdViewModel()
                {
                    CarrinhoId = carrinhoInserir.CarrinhoId.ToString()
                };
            }

            var carrinho = _carrinhoRepository.ListarCarrinho().Where(x => x.ClienteId == cliente.Id).LastOrDefault();

            if(carrinho == null)
            {
                var carrinhoInserir = new Carrinho()
                {
                    CarrinhoId = Guid.NewGuid(),
                    ClienteId = cliente.Id,
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

        public ClienteViewModel Listar(ClienteViewModel model) => _clienteRepository.Listar().Where(x => x.Telefone == model.Telefone)
            .Select(x => new ClienteViewModel()
            {
                Nome = x.Nome,
            }).FirstOrDefault();
    }
}
