using BonaLiz.Dados.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Domain.Interfaces
{
	public interface IVendaRepository
	{
		void Inserir(Venda model);
		Venda Cancelar(int id);
		List<Venda> Listar();
		Venda ObterPorGuid(Guid guid);
		List<Venda> Filtrar(Venda model);
		void StatusVenda(int id, string status);
	}
}
