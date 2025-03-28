using BonaLiz.Dados.Models;
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
        void Inserir(List<IFormFile> lista, int idProduto);
        List<ImagemProdutoViewModel> Listar();
        public void Remover(ImagemProdutoViewModel model);
        ImagemProdutoViewModel ListarPorId(int id);
    }
}
