using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using BonaLiz.Domain.Repository;
using BonaLiz.Negocio.Helpers;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.Utils;
using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.Services
{
	public class VendaServices(IVendaRepository _vendaRepository, IProdutoRepository _produtoRepository,
		IClienteRepository _clienteRepository, IImagemRepository _imagemRepository,
         IHttpContextAccessor _httpContextAccessor) : IVendaServices
	{
		public VendaViewModel Inserir(VendaViewModel model)
		{
            var venda = new Venda
			{
				ClienteId = Convert.ToInt32(model.ClienteId),
				DataVenda = model.DataVenda == "" ? DateTime.Now : Convert.ToDateTime(model.DataVenda),
				Guid = Guid.NewGuid()
			};


			var vendaEntity =_vendaRepository.Inserir(venda);

			var listaProdutos = new List<Produto>();

            foreach (var item in model.VendaItensViewModel)
			{
				var vendaItem = new VendaItens
				{
					ProdutoId = Convert.ToInt32(item.ProdutoId),
					Quantidade = Convert.ToInt32(item.Quantidade),
					VendaId = vendaEntity.Id,
					Valor = Convert.ToDecimal(item.Valor)
				};

                vendaItem = _vendaRepository.InserirItemVenda(vendaItem);

				if(vendaItem.Id != 0)
				{
                    var produto = _produtoRepository.ObterPorId(Convert.ToInt32(item.ProdutoId));
                    produto.Quantidade = produto.Quantidade - Convert.ToInt32(item.Quantidade);
                    _produtoRepository.Editar(produto);
					listaProdutos.Add(produto);
                }
            }
            var clientes = _clienteRepository.Listar();
			var produtos = _produtoRepository.Listar();

            return new VendaViewModel()
            {
                Id = vendaEntity.Id,
                Guid = vendaEntity.Guid,
                DataVenda = vendaEntity.DataVenda.Value.ToString("dd/MM/yyyy"),
                Cancelada = vendaEntity.Cancelada.ToString(),
                Status = vendaEntity.Status,
                NomeCliente = clientes.Where(x => x.Id == vendaEntity.ClienteId).ToString(),
				NomeProduto = string.Join(", ", listaProdutos.Select(x => x.Nome))
            };
        }

		public List<VendaViewModel> Listar()
		{
			var produtos = _produtoRepository.Listar();
			var clientes = _clienteRepository.Listar();
			var venda = _vendaRepository.Listar();
			var vendaItens = _vendaRepository.ListarItens();

			return venda.Select(x => new VendaViewModel()
			{
				Id = x.Id,
				Guid = x.Guid,
				NomeCliente = clientes.Where(y => y.Id.Equals(x.ClienteId)).First().Nome,
				Quantidade = vendaItens.Where(y => y.VendaId == x.Id).Sum(y => y.Quantidade).ToString(),
				Valor = Formater.FormatarMoeda(vendaItens.Where(y => y.VendaId == x.Id).Sum(y => y.Valor)).ToString(),
				DataVenda = x.DataVenda.Value.ToString("dd/MM/yyyy"),
				Cancelada = x.Cancelada.HasValue ? x.Cancelada.ToString() : "",
				Status = x.Status
			}).ToList();

		}

		public VendaViewModel ObterPorGuid(Guid guid)
		{
            var produtos = _produtoRepository.Listar();
            var clientes = _clienteRepository.Listar();
            var venda = _vendaRepository.ObterPorGuid(guid);
            var vendaItens = _vendaRepository.ListarItens();
            return new VendaViewModel()
			{
				Id = venda.Id,
				Guid = venda.Guid,
                NomeCliente = clientes.Where(y => y.Id.Equals(venda.ClienteId)).First().Nome,
                Quantidade = vendaItens.Where(y => y.VendaId == venda.Id).Sum(y => y.Quantidade).ToString(),
                Valor = Formater.FormatarMoeda(vendaItens.Where(y => y.VendaId == venda.Id).Sum(y => y.Valor)).ToString(),
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
				//ProdutoId = string.IsNullOrEmpty(model.ProdutoId) ? null : Convert.ToInt32(model.ProdutoId),
				DataVenda = string.IsNullOrEmpty(model.DataVenda) ? null : Convert.ToDateTime(model.DataVenda),
				Status = model.Status
			};

            var lista = Filtrar(venda);
			var produtos = _produtoRepository.Listar();
			var clientes = _clienteRepository.Listar();
			var vendaItens = _vendaRepository.ListarItens();
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
                    Quantidade = vendaItens.Where(y => y.VendaId == x.Id).Sum(y => y.Quantidade).ToString(),
                    Valor = Formater.FormatarMoeda(vendaItens.Where(y => y.VendaId == x.Id).Sum(y => y.Valor)).ToString(),
                    DataVenda = x.DataVenda.Value.ToString("dd/MM/yyyy"),
					Cancelada = x.Cancelada.ToString(),
					Status = x.Status
				}).ToList();
			}
		}

		public VendaViewModel Cancelar(int id)
		{
			var venda = _vendaRepository.Listar().Where(x => x.Id == id).FirstOrDefault();
            var clientes = _clienteRepository.Listar();
			var itens = _vendaRepository.ListarItens();
            string status = string.Empty;

            if (venda.Cancelada == null)
			{
                var cancelada = _vendaRepository.Cancelar(id);
				venda.Cancelada = cancelada.Cancelada;
                var vendaItens = _vendaRepository.ListarItens().Where(x => x.VendaId == id);
                foreach (var item in vendaItens)
                {
                    var produto = _produtoRepository.ObterPorId(item.ProdutoId);
                    produto.Quantidade = produto.Quantidade + item.Quantidade;
                    _produtoRepository.Editar(produto);
                }

            }

            return new VendaViewModel()
            {
                Id = venda.Id,
                Guid = venda.Guid,
                NomeCliente = clientes.Where(y => y.Id.Equals(venda.ClienteId)).First().Nome,
                Quantidade = itens.Where(y => y.VendaId == venda.Id).Sum(y => y.Quantidade).ToString(),
                Valor = Formater.FormatarMoeda(itens.Where(y => y.VendaId == venda.Id).Sum(y => y.Valor)).ToString(),
                DataVenda = venda.DataVenda.Value.ToString("dd/MM/yyyy"),
                Cancelada = venda.Cancelada.ToString(),
                Status = venda.Status
            };
        }

		public VendaViewModel StatusVenda(int id, string status)
		{
			var vendaEntity = _vendaRepository.StatusVenda(id, status);
            var vendaItens = _vendaRepository.ListarItens();

            return new VendaViewModel()
            {
                Id = vendaEntity.Id,
                Guid = vendaEntity.Guid,
                NomeCliente = _clienteRepository.ObterPorId(vendaEntity.ClienteId.Value).Nome,
                Quantidade = vendaItens.Where(y => y.VendaId == vendaEntity.Id).Sum(y => y.Quantidade).ToString(),
                Valor = Formater.FormatarMoeda(vendaItens.Where(y => y.VendaId == vendaEntity.Id).Sum(y => y.Valor)).ToString(),
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
						//.Where(x => model.ProdutoId == 0 || x.ProdutoId == model.ProdutoId)
						.Where(x => model.DataVenda == null || x.DataVenda == model.DataVenda.Value).FirstOrDefault();
					novaListaVenda.Add(venda);
				}
				return novaListaVenda;
			}
			else
			{
				return vendas
						//.Where(x => model.ProdutoId == null || x.ProdutoId == model.ProdutoId)
						.Where(x => model.DataVenda == null || x.DataVenda == model.DataVenda.Value)
						.Where(x => string.IsNullOrEmpty(model.Status) || x.Status == model.Status)
						.ToList();
			}
		}

        public List<VendaItensViewModel> ListaItensVenda(int vendaId)
        {
            var vendaItens = _vendaRepository.ListarItens().Where(x => x.VendaId == vendaId);
			var produtos = _produtoRepository.Listar();
			var imagens = _imagemRepository.Listar();

			return vendaItens.Select(x => new VendaItensViewModel
			{
				Id = x.Id,
				NomeProduto = produtos.Where(y => y.Id == x.ProdutoId).FirstOrDefault().Nome,
				Quantidade = x.Quantidade.ToString(),
				Valor = Formater.FormatarMoeda(x.Valor),
				ImagemProduto = Arquivo.FormataURL(imagens.Where(y => y.ProdutoId == x.ProdutoId).FirstOrDefault().NomeImagem, _httpContextAccessor)
			}).ToList();
        }
    }
}
