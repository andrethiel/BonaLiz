using AutoMapper;
using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using BonaLiz.Negocio.Helpers;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.Services
{
	public class VendaServices : IVendaServices
	{
		private readonly IVendaRepository _vendaRepository;
		private readonly IProdutoRepository _produtoRepository;
		private readonly IClienteRepository _clienteRepository;
		private readonly IMapper _mapper;
		public VendaServices(IVendaRepository vendaRepository, IMapper mapper, IProdutoRepository produtoRepository, IClienteRepository clienteRepository)
		{
			_vendaRepository = vendaRepository;
			_produtoRepository = produtoRepository;
			_mapper = mapper;
			_clienteRepository = clienteRepository;
		}

		public void Inserir(VendaViewModel model)
		{
			var produto = _produtoRepository.ObterPorId(Convert.ToInt32(model.ProdutoId));

			var venda = produto.PrecoVenda * Convert.ToInt32(model.Quantidade);
			model.Valor = venda.ToString();

			_vendaRepository.Inserir(_mapper.Map<Venda>(model));
			produto.Quantidade = produto.Quantidade - Convert.ToInt32(model.Quantidade);
			_produtoRepository.Editar(produto);
		}

		public List<VendaViewModel> Listar()
		{
			return _vendaRepository.Listar().Select(x => new VendaViewModel()
			{
				Id = x.Id, 
				Guid = x.Guid,
				NomeCliente = _clienteRepository.ObterPorId(x.ClienteId).Nome,
				NomeProduto = _produtoRepository.ObterPorId(x.ProdutoId).Nome,
				Quantidade = x.Quantidade.ToString(),
				Valor = Formater.FormatarMoeda(x.Valor),
				DataVenda = x.DataVenda.Value.ToString("dd/MM/yyyy"),
				Cancelada = x.Cancelada.ToString()
			}).ToList();

		}

		public VendaViewModel ObterPorGuid(Guid guid)
		{
			var venda = _vendaRepository.ObterPorGuid(guid);
			return new VendaViewModel()
			{
				Id = venda.Id,
				Guid = venda.Guid,
				NomeCliente = _clienteRepository.ObterPorId(venda.ClienteId).Nome,
				NomeProduto = _produtoRepository.ObterPorId(venda.ProdutoId).Nome,
				Quantidade = venda.Quantidade.ToString(),
				Valor = Formater.FormatarMoeda(venda.Valor),
				DataVenda = venda.DataVenda.Value.ToString("dd/MM/yyyy"),
				Cancelada = venda.Cancelada.ToString()
			};
		}


		public List<VendaViewModel> Filtrar(VendaViewModel model)
		{
			var lista = _vendaRepository.Filtrar(_mapper.Map<Venda>(model));
			if (lista == null)
			{
				return new List<VendaViewModel>();
			}
			else
			{
				return lista.Select(x => new VendaViewModel()
				{
					Id = x.Id,
					Guid = x.Guid,
					NomeCliente = _clienteRepository.ObterPorId(x.ClienteId).Nome,
					NomeProduto = _produtoRepository.ObterPorId(x.ProdutoId).Nome,
					Quantidade = x.Quantidade.ToString(),
					Valor = Formater.FormatarMoeda(x.Valor),
					DataVenda = x.DataVenda.Value.ToString("dd/MM/yyyy"),
					Cancelada = x.Cancelada.ToString()
				}).ToList();
			}
		}

		public void Cancelar(int id)
		{
			var venda = _vendaRepository.Cancelar(id);

			var produto = _produtoRepository.ObterPorId(venda.ProdutoId);
			produto.Quantidade = produto.Quantidade + venda.Quantidade;
			_produtoRepository.Editar(produto);

		}
	}
}
