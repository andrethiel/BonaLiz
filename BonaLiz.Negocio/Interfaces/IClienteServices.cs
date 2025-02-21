using BonaLiz.Negocio.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.Interfaces
{
	public interface IClienteServices
	{
        void Inserir(ClienteViewModel model);
		void Editar(ClienteViewModel model);
        List<ClienteViewModel> Listar();
		ClienteViewModel ObterPorId(int id);
		ClienteViewModel ObterPorGuid(Guid Guid);
        List<ClienteViewModel> Filtrar(ClienteViewModel model);
	}
}
