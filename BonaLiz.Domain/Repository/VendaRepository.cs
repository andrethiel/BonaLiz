using BonaLiz.Dados.Context;
using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Domain.Repository
{
	public class VendaRepository : IVendaRepository
	{
		private readonly DataContext _context;
		public VendaRepository(DataContext context)
		{
			_context = context;
		}

		public void Inserir(Venda model)
		{
			model.DataVenda = DateTime.Now;
			_context.Venda.Add(model);
			_context.SaveChanges();
		}

		public List<Venda> Listar() => _context.Venda.ToList();

		public Venda ObterPorGuid(Guid guid) => _context.Venda.Where(x => x.Guid == guid).FirstOrDefault();

		public List<Venda> Filtrar(Venda model)
		{
			var listaClientes = _context.Cliente.ToList();
			var novaListaVenda = new List<Venda>();
			var novaListaClientes = new List<Cliente>();
			if (!string.IsNullOrEmpty(model.NomeCliente))
				novaListaClientes = listaClientes.Where(x => x.Nome.Contains(model.NomeCliente)).ToList();
			if (novaListaClientes.Count() > 0)
			{
				foreach (var item in novaListaClientes)
				{
					var venda = _context.Venda
						.Where(x => string.IsNullOrEmpty(model.NomeCliente) || x.ClienteId == item.Id)
						.Where(x => model.ProdutoId == 0 || x.ProdutoId == model.ProdutoId)
						.Where(x => model.DataVenda == null || x.DataVenda == model.DataVenda.Value).FirstOrDefault();
					novaListaVenda.Add(venda);
				}
				return novaListaVenda;
			}
			else
			{
				return _context.Venda
						.Where(x => model.ProdutoId == 0 || x.ProdutoId == model.ProdutoId)
						.Where(x => model.DataVenda == null || x.DataVenda == model.DataVenda.Value)
						.Where(x => string.IsNullOrEmpty(model.Status) || x.Status == model.Status)
						.ToList();
			}
		}

		public Venda Cancelar(int id)
		{
			var venda = _context.Venda.Where(x => x.Id == id).FirstOrDefault();
			if(venda != null)
			{
				venda.Cancelada = true;
				_context.Venda.Update(venda);
				_context.SaveChanges();
			}

			return venda;
		}

		public void StatusVenda(int id, string status)
		{
			var venda = _context.Venda.Where(x => x.Id == id).FirstOrDefault();

			if(venda != null)
			{
				venda.Status = status;
				_context.Venda.Update(venda);
				_context.SaveChanges();
			}
		}
	}
}
