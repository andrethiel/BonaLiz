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
        void Inserir(List<ImagemProduto> lista);
        List<ImagemProduto> Listar();
        public void Remove(ImagemProduto model);
        ImagemProduto ListarPorId(int id);
    }
}
