using AutoMapper;
using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using BonaLiz.Domain.Repository;
using BonaLiz.Negocio.Helpers;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using Microsoft.EntityFrameworkCore;
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

		public VendaViewModel Inserir(VendaViewModel model)
		{
			var produto = _produtoRepository.ObterPorId(Convert.ToInt32(model.ProdutoId));
            var clientes = _clienteRepository.Listar();

            var venda = new Venda
			{
				Cancelada = false,
				ClienteId = Convert.ToInt32(model.ClienteId),
				DataVenda = DateTime.Now,
				ProdutoId = Convert.ToInt32(model.ProdutoId),
				Quantidade = Convert.ToInt32(model.Quantidade),
				Valor = produto.PrecoVenda * Convert.ToInt32(model.Quantidade),
				Guid = Guid.NewGuid(),
				Status = "Aguardando",
			};


			var vendaEntity =_vendaRepository.Inserir(venda);
			produto.Quantidade = produto.Quantidade - Convert.ToInt32(model.Quantidade);
			_produtoRepository.Editar(produto);

			return new VendaViewModel()
            {
                Id = vendaEntity.Id,
                Guid = vendaEntity.Guid,
                NomeCliente = _clienteRepository.ObterPorId(vendaEntity.ClienteId.Value).Nome,
                NomeProduto = _produtoRepository.ObterPorId(vendaEntity.ProdutoId.Value).Nome,
                Quantidade = vendaEntity.Quantidade.ToString(),
                Valor = Formater.FormatarMoeda(vendaEntity.Valor),
                DataVenda = vendaEntity.DataVenda.Value.ToString("dd/MM/yyyy"),
                Cancelada = vendaEntity.Cancelada.ToString(),
                Status = vendaEntity.Status
            };
        }

		public List<VendaViewModel> Listar()
		{
			var produtos = _produtoRepository.Listar();
			var clientes = _clienteRepository.Listar();

            return _vendaRepository.Listar().Select(x => new VendaViewModel()
			{
				Id = x.Id, 
				Guid = x.Guid,
				NomeCliente = clientes.Where(y => y.Id.Equals(x.ClienteId)).First().Nome,
				NomeProduto = produtos.Where(y => y.Id.Equals(x.ProdutoId)).First().Nome,
				Quantidade = x.Quantidade.ToString(),
				Valor = Formater.FormatarMoeda(x.Valor),
				DataVenda = x.DataVenda.Value.ToString("dd/MM/yyyy"),
				Cancelada = x.Cancelada.ToString(),
				Status = x.Status
			}).ToList();

		}

		public VendaViewModel ObterPorGuid(Guid guid)
		{
            var produtos = _produtoRepository.Listar();
            var clientes = _clienteRepository.Listar();
            var venda = _vendaRepository.ObterPorGuid(guid);
			return new VendaViewModel()
			{
				Id = venda.Id,
				Guid = venda.Guid,
                NomeCliente = clientes.Where(y => y.Id.Equals(venda.ClienteId)).First().Nome,
                NomeProduto = produtos.Where(y => y.Id.Equals(venda.ProdutoId)).First().Nome,
                Quantidade = venda.Quantidade.ToString(),
				Valor = Formater.FormatarMoeda(venda.Valor),
				DataVenda = venda.DataVenda.Value.ToString("dd/MM/yyyy"),
				Cancelada = venda.Cancelada.ToString(),
				Status = venda.Status
			};
		}


		public List<VendaViewModel> Filtrar(VendaViewModel model)
		{
			var venda = new Venda
			{
				NomeCliente = model.NomeCliente,
				ProdutoId = string.IsNullOrEmpty(model.ProdutoId) ? null : Convert.ToInt32(model.ProdutoId),
				DataVenda = string.IsNullOrEmpty(model.DataVenda) ? null : Convert.ToDateTime(model.DataVenda),
				Status = model.Status
			};

            var lista = Filtrar(venda);
			var produtos = _produtoRepository.Listar();
			var clientes = _clienteRepository.Listar();
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
					NomeCliente = clientes.Where(y => y.Id.Equals(x.ClienteId)).First().Nome,
					NomeProduto = produtos.Where(y => y.Id.Equals(x.ProdutoId)).First().Nome,
					Quantidade = x.Quantidade.ToString(),
					Valor = Formater.FormatarMoeda(x.Valor),
					DataVenda = x.DataVenda.Value.ToString("dd/MM/yyyy"),
					Cancelada = x.Cancelada.ToString(),
					Status = x.Status
				}).ToList();
			}
		}

		public VendaViewModel Cancelar(int id)
		{
			var venda = _vendaRepository.Cancelar(id);

			var produto = _produtoRepository.ObterPorId(venda.ProdutoId.Value);
			produto.Quantidade = produto.Quantidade + venda.Quantidade;
			_produtoRepository.Editar(produto);

            return new VendaViewModel()
            {
                Id = venda.Id,
                Guid = venda.Guid,
                NomeCliente = _clienteRepository.ObterPorId(venda.ClienteId.Value).Nome,
                NomeProduto = _produtoRepository.ObterPorId(venda.ProdutoId.Value).Nome,
                Quantidade = venda.Quantidade.ToString(),
                Valor = Formater.FormatarMoeda(venda.Valor),
                DataVenda = venda.DataVenda.Value.ToString("dd/MM/yyyy"),
                Cancelada = venda.Cancelada.ToString(),
                Status = venda.Status
            };
        }

		public VendaViewModel StatusVenda(int id, string status)
		{
			var vendaEntity = _vendaRepository.StatusVenda(id, status);

            return new VendaViewModel()
            {
                Id = vendaEntity.Id,
                Guid = vendaEntity.Guid,
                NomeCliente = _clienteRepository.ObterPorId(vendaEntity.ClienteId.Value).Nome,
                NomeProduto = _produtoRepository.ObterPorId(vendaEntity.ProdutoId.Value).Nome,
                Quantidade = vendaEntity.Quantidade.ToString(),
                Valor = Formater.FormatarMoeda(vendaEntity.Valor),
                DataVenda = vendaEntity.DataVenda.Value.ToString("dd/MM/yyyy"),
                Cancelada = vendaEntity.Cancelada.ToString(),
                Status = vendaEntity.Status
            };
        }

		private List<Venda> Filtrar(Venda model)
		{
			var listaClientes = _clienteRepository.Listar();
            var vendas = _vendaRepository.Listar();
            var novaListaVenda = new List<Venda>();
			var novaListaClientes = new List<Cliente>();
			if (!string.IsNullOrEmpty(model.NomeCliente))
				novaListaClientes = listaClientes.Where(x => x.Nome.ToUpper().Contains(model.NomeCliente.ToUpper())).ToList();
			if (novaListaClientes.Count() > 0)
			{
				foreach (var item in novaListaClientes)
				{
					var venda = vendas
						.Where(x => string.IsNullOrEmpty(model.NomeCliente) || x.ClienteId == item.Id)
						.Where(x => model.ProdutoId == 0 || x.ProdutoId == model.ProdutoId)
						.Where(x => model.DataVenda == null || x.DataVenda == model.DataVenda.Value).FirstOrDefault();
					novaListaVenda.Add(venda);
				}
				return novaListaVenda;
			}
			else
			{
				return vendas
						.Where(x => model.ProdutoId == null || x.ProdutoId == model.ProdutoId)
						.Where(x => model.DataVenda == null || x.DataVenda == model.DataVenda.Value)
						.Where(x => string.IsNullOrEmpty(model.Status) || x.Status == model.Status)
						.ToList();
			}
		}
	}
}
