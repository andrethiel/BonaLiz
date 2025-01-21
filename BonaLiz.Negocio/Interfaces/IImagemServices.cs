using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.Interfaces
{
    public interface IImagemServices
    {
        Task Inserir(List<IFormFile> lista, int idProduto);

        Task<List<ImagemProdutoViewModel>> Listar();
    }
}
