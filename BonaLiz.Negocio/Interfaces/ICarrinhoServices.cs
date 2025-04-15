using BonaLiz.Dados.Models;
using BonaLiz.Negocio.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.Interfaces
{
    public interface ICarrinhoServices
    {
        void Inserir(List<CarrinhoItensViewModel> model);
        void AlteraQuantidade(CarrinhoItensViewModel model);
        void DeletarItem(CarrinhoItensViewModel model);
        CarrinhoIdViewModel ObterPorId(string carrinhoId);
        List<CarrinhoItensViewModel> ObterItensPorId(string carrinhoId);
        void Deletar(string carrinhoId);
        List<CarrinhoViewModel> ListarCarrinhos();
    }
}
