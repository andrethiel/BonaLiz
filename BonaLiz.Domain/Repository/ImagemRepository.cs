using BonaLiz.Dados.Context;
using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Domain.Repository
{
    public class ImagemRepository(IRepositoryBase<ImagemProduto> _repositoryBase) : IImagemRepository
    {

        public void Inserir(List<ImagemProduto> lista)
        {
            try
            {
                _repositoryBase.InserirRange(lista);
            }
            catch (Exception ex) { }
            
        }

        public List<ImagemProduto> Listar() => _repositoryBase.Listar();
    }
}
