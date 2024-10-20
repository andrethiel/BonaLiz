using BonaLiz.Negocio.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.Interfaces
{
    public interface IFornecedorServices
    {
        void Inserir(FornecedorViewModel model);
        void Editar(FornecedorViewModel model);
        List<FornecedorViewModel> Listar();
        FornecedorViewModel ObterPorId(int id);
        FornecedorViewModel ObterPorGuid(Guid Guid);
        List<FornecedorViewModel> Filtrar(FornecedorViewModel model);

	}
}
