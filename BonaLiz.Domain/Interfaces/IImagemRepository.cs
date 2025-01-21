using BonaLiz.Dados.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Domain.Interfaces
{
    public interface IImagemRepository
    {
        Task Inserir(List<ImagemProduto> lista);

        Task<List<ImagemProduto>> Listar();
    }
}
