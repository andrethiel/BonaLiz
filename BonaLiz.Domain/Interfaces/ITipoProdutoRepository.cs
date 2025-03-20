using BonaLiz.Dados.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Domain.Interfaces
{
    public interface ITipoProdutoRepository
    {
        TipoProduto Cadastrar(TipoProduto model);
        TipoProduto Editar(TipoProduto model);
        List<TipoProduto> Listar();
        TipoProduto ObterPorId(int id);
        TipoProduto ObterPorGuid(Guid guid);
        List<TipoProduto> Filtrar(TipoProduto model);
    }
}
