using BonaLiz.Dados.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Domain.Interfaces
{
	public interface IClienteRepository
	{
		void Inserir(Cliente model);
		void Editar(Cliente model);
		List<Cliente> Listar();
		Cliente ObterPorId(int id);
		Cliente ObterPorGuid(Guid Guid);
		List<Cliente> Filtrar(Cliente model);
	}
}
