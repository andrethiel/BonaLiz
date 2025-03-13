using BonaLiz.Negocio.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.Interfaces
{
    public interface IProdutoServices
    {
        void Cadastrar(ProdutoViewModel model);
        void Editar(ProdutoViewModel model);
        List<ProdutoViewModel> Listar(ProdutoViewModel model);
        List<ProdutoViewModel> ListarPrincipal(ProdutoViewModel model);
		ProdutoViewModel ObterPorGuid(Guid guid);
        ProdutoViewModel ObterPorId(int id);
        List<ProdutoViewModel> Filtrar(ProdutoViewModel model);


    }
}
