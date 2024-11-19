using BonaLiz.Negocio.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.Interfaces
{
	public interface IVendaServices
	{
		void Inserir(VendaViewModel model);
		void Cancelar(int id);
		List<VendaViewModel> Listar();
		VendaViewModel ObterPorGuid(Guid guid);
		List<VendaViewModel> Filtrar(VendaViewModel model);
		void StatusVenda(int id, string status);
	}
}
