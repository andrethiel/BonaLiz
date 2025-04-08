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
	public class ClienteServices(IClienteRepository _clienteRepository) : IClienteServices
	{

		public ClienteViewModel Editar(ClienteViewModel model)
		{
            var cliente = _clienteRepository.ObterPorId(model.Id);
			if (cliente != null) {
				cliente.Nome = model.Nome;
				cliente.Email = model.Email;
				cliente.Telefone = model.Telefone.Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "");
				cliente.Inativo = Convert.ToBoolean(model.Inativo);
			}
			var clienteEntity = _clienteRepository.Editar(cliente);

            return new ClienteViewModel()
            {
				Id = clienteEntity.Id,
				Guid = clienteEntity.Guid,
                Nome = clienteEntity.Nome,
                Telefone = clienteEntity.Telefone,
                Email = clienteEntity.Email,
                Inativo = clienteEntity.Inativo.ToString()
            };
        }

		public List<ClienteViewModel> Filtrar(ClienteViewModel model)
		{
			var cliente = new Cliente
			{
				Nome = model.Nome,
				Email = model.Email,
				Telefone = model.Telefone.Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", ""),
				Inativo = Convert.ToBoolean(model.Inativo)
			};


            var lista = _clienteRepository.Filtrar(cliente);
			return lista.Select(x => new ClienteViewModel()
            {
                Nome = x.Nome,
                Telefone = x.Telefone,
                Email = x.Email,
                Inativo = x.Inativo.ToString()
            }).ToList();
        }

        public ClienteViewModel Inserir(ClienteViewModel model)
		{
			var cliente = new Cliente
			{
				Id = model.Id,
				Guid = Guid.NewGuid(),
				Nome = model.Nome,
				Email = model.Email,
				Telefone = model.Telefone.Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", ""),
				Inativo = false
			};

            var clienteEntity = _clienteRepository.Inserir(cliente);

			return new ClienteViewModel()
            {
                Nome = clienteEntity.Nome,
                Telefone = clienteEntity.Telefone,
                Email = clienteEntity.Email,
                Inativo = clienteEntity.Inativo.ToString()
            };
        }


        public List<ClienteViewModel> Listar()
		{
			try
			{
				var lista = _clienteRepository.Listar();
                return lista.Select(x => new ClienteViewModel()
                {
					Id = x.Id,
					Guid = x.Guid,
                    Nome = x.Nome,
                    Telefone = x.Telefone,
                    Email = x.Email,
                    Inativo = x.Inativo.ToString()
                }).ToList();
            }
			catch (Exception ex) { throw; }
        }

		public ClienteViewModel ObterPorGuid(Guid Guid)
		{
			var cliente = _clienteRepository.ObterPorGuid(Guid);
			return new ClienteViewModel()
			{
                Id = cliente.Id,
                Guid = cliente.Guid,
                Nome = cliente.Nome,
				Telefone = cliente.Telefone,
				Email = cliente.Email,
				Inativo = cliente.Inativo.ToString()
			};
		}

		public ClienteViewModel ObterPorId(int id)
		{
			var cliente = _clienteRepository.ObterPorId(id);
			return new ClienteViewModel()
			{
				Nome = cliente.Nome
			};
		}        
    }
}
