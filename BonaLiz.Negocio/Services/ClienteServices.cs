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
	public class ClienteServices : IClienteServices
	{
		private readonly IClienteRepository _clienteRepository;
		private readonly IMapper _mapper;

		public ClienteServices(IClienteRepository clienteRepository, IMapper mapper)
		{
			_clienteRepository = clienteRepository;
			_mapper = mapper;
		}

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
			return _clienteRepository.Filtrar(_mapper.Map<Cliente>(model)).Select(x => new ClienteViewModel()
			{
				Id = x.Id,
				Guid = x.Guid,
				Nome = x.Nome,
				Telefone = x.Telefone,
				Email = x.Email,
				Inativo = x.Inativo.ToString()
			}).ToList();
		}

		public void Inserir(ClienteViewModel model)
		{
			_clienteRepository.Inserir(_mapper.Map<Cliente>(model));
		}

		public List<ClienteViewModel> Listar() => _clienteRepository.Listar().Select(x => new ClienteViewModel()
		{
			Id = x.Id,
			Guid = x.Guid,
			Nome = x.Nome,
			Telefone = x.Telefone,
			Email = x.Email,
			Inativo = x.Inativo.ToString()
		}).ToList();

		public ClienteViewModel ObterPorGuid(Guid Guid)
		{
			return _mapper.Map<ClienteViewModel>(_clienteRepository.ObterPorGuid(Guid));
		}

		public ClienteViewModel ObterPorId(int id)
		{
			return _mapper.Map<ClienteViewModel>(_clienteRepository.ObterPorId(id));
		}
	}
}
