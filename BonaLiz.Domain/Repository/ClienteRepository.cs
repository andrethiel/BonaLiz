using ApiGateway.Dados.Context;
using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Domain.Repository
{
	public class ClienteRepository : IClienteRepository
	{
		private readonly DataContext _context;

		public ClienteRepository(DataContext context)
		{
			_context = context;
		}

		public void Editar(Cliente model)
		{
			_context.Cliente.Update(model);
			_context.SaveChanges();
		}

		public List<Cliente> Filtrar(Cliente model)
		{
			return _context.Cliente
				.Where(x => string.IsNullOrEmpty(model.Nome) || x.Nome.Contains(model.Nome))
				.Where(x => string.IsNullOrEmpty(model.Email) || x.Email.Contains(model.Email))
				.ToList();
		}

		public void Inserir(Cliente model)
		{
			_context.Cliente.Add(model);
			_context.SaveChanges();
		}

		public List<Cliente> Listar() => _context.Cliente.ToList();

		public Cliente ObterPorGuid(Guid Guid) => _context.Cliente.FirstOrDefault(x => x.Guid == Guid);

		public Cliente ObterPorId(int id) => _context.Cliente.FirstOrDefault(x => x.Id == id);
	}
}
