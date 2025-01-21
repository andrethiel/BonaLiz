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
    public class ImagemRepository : IImagemRepository
    {
        private readonly DataContext _context;

        public ImagemRepository(DataContext context)
        {
            _context = context;
        }

        public async Task Inserir(List<ImagemProduto> lista)
        {
            try
            {
                await _context.ImagemProduto.AddRangeAsync(lista);
                _context.SaveChanges();
            }
            catch (Exception ex) { }
            
        }

        public async Task<List<ImagemProduto>> Listar() => await _context.ImagemProduto.ToListAsync();
    }
}
