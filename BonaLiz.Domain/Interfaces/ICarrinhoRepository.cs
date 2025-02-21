using BonaLiz.Dados.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Domain.Interfaces
{
    public interface ICarrinhoRepository
    {
        
        void InserirItens(List<CarrinhoItens> model);
        void Editar(CarrinhoItens model);
        void Deletar(CarrinhoItens model);
        List<CarrinhoItens> ObterItensPorId(Guid CarrinhoId);
        void Inserir(Carrinho model);
        Carrinho ObterPorClienteId(int clienteId);
    }
}
