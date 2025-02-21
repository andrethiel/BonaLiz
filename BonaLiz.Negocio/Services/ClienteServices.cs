using AutoMapper;
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
	public class ClienteServices(IClienteRepository _clienteRepository, IMapper _mapper) : IClienteServices
	{

		public void Editar(ClienteViewModel model)
		{
			var cliente = _clienteRepository.ObterPorId(model.Id);
			if (cliente != null) {
				cliente.Nome = model.Nome;
				cliente.Email = model.Email;
				cliente.Telefone = model.Telefone;
				cliente.Inativo = Convert.ToBoolean(model.Inativo);
			}
			_clienteRepository.Editar(cliente);
		}

		public List<ClienteViewModel> Filtrar(ClienteViewModel model)
		{
			var lista = _clienteRepository.Filtrar(_mapper.Map<Cliente>(model));
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

        public void Inserir(ClienteViewModel model) => _clienteRepository.Inserir(_mapper.Map<Cliente>(model));

        public List<ClienteViewModel> Listar()
		{
			try
			{
                var lista =  _clienteRepository.Listar();
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
			return _mapper.Map<ClienteViewModel>(_clienteRepository.ObterPorGuid(Guid));
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
