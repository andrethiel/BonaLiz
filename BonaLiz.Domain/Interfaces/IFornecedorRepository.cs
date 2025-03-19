using BonaLiz.Dados.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Domain.Interfaces
{
    public interface IFornecedorRepository
    {
        Fornecedor Inserir(Fornecedor model);
        Fornecedor Editar(Fornecedor model);
        List<Fornecedor> Listar();
        Fornecedor ObterPorId(int id);
        Fornecedor ObterPorGuid(Guid Guid);
        List<Fornecedor> Filtrar(Fornecedor model);
    }
}
