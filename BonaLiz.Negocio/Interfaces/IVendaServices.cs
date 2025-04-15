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
        VendaViewModel Inserir(VendaViewModel model);
        VendaViewModel Cancelar(int id);
		List<VendaViewModel> Listar();
		VendaViewModel ObterPorGuid(Guid guid);
        List<VendaViewModel> Filtrar(VendaViewModel model);
        VendaViewModel StatusVenda(int id, string status);
		List<VendaItensViewModel> ListaItensVenda(int vendaId);
	}
}
