using BonaLiz.Dados.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Domain.Interfaces
{
    public interface IProdutoRepository
    {
        void Inserir(Produto model);
        void Editar(Produto model);
        List<Produto> Listar();
        Produto ObterPorId(int id);
        Produto ObterPorGuid(Guid guid);
        List<Produto> Filtrar(Produto model);
    }
}
