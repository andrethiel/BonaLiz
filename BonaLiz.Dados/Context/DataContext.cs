using BonaLiz.Dados.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace BonaLiz.Dados.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CarrinhoItens>().Ignore(x => x.Guid);
            modelBuilder.Entity<ImagemProduto>().Ignore(x => x.Guid);
            modelBuilder.Entity<Carrinho>().Ignore(x => x.Guid);
            modelBuilder.Entity<Carrinho>().Ignore(x => x.Id);
        }
        public DbSet<Fornecedor> Fornecedor { get; set; }
        public DbSet<TipoProduto> TipoProduto { get; set; }
        public DbSet<Produto> Produto { get; set; }
		public DbSet<Cliente> Cliente { get; set; }
		public DbSet<Venda> Venda { get; set; }
        public DbSet<ImagemProduto> ImagemProduto { get; set; }
        public DbSet<Carrinho> Carrinho { get; set; }
        public DbSet<CarrinhoItens> CarrinhoItens { get; set; }
        public DbSet<Login> Login { get; set; }
    }
}
