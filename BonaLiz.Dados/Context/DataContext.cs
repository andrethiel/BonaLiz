using BonaLiz.Dados.Models;
using Microsoft.AspNetCore.Http;
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
        private readonly IHttpContextAccessor _httpContextAccessor;
        public DataContext(DbContextOptions<DataContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var tenantId = _httpContextAccessor.HttpContext?.Items["TenantId"] as Guid?;
            if (tenantId != null)
            {
                modelBuilder.Entity<Fornecedor>().HasQueryFilter(x => x.TenantId == tenantId);
                modelBuilder.Entity<TipoProduto>().HasQueryFilter(x => x.TenantId == tenantId);
                modelBuilder.Entity<Produto>().HasQueryFilter(x => x.TenantId == tenantId);
                modelBuilder.Entity<Cliente>().HasQueryFilter(x => x.TenantId == tenantId);
                modelBuilder.Entity<Venda>().HasQueryFilter(x => x.TenantId == tenantId);
                modelBuilder.Entity<Carrinho>().HasQueryFilter(x => x.TenantId == tenantId);
            }


            modelBuilder.Entity<CarrinhoItens>().Ignore(x => x.Guid);
            modelBuilder.Entity<ImagemProduto>().Ignore(x => x.Guid);
            modelBuilder.Entity<Carrinho>().Ignore(x => x.Guid);
            modelBuilder.Entity<Carrinho>().Ignore(x => x.Id);

            modelBuilder.Entity<Menu>().Ignore(x => x.Guid);
            modelBuilder.Entity<MenuPerfil>().Ignore(x => x.Guid);
            modelBuilder.Entity<VendaItens>().Ignore(x => x.Guid);

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Fornecedor> Fornecedor { get; set; }
        public DbSet<TipoProduto> TipoProduto { get; set; }
        public DbSet<Produto> Produto { get; set; }
		public DbSet<Cliente> Cliente { get; set; }
		public DbSet<Venda> Venda { get; set; }
        public DbSet<VendaItens> VendaItens { get; set; }
        public DbSet<ImagemProduto> ImagemProduto { get; set; }
        public DbSet<Carrinho> Carrinho { get; set; }
        public DbSet<CarrinhoItens> CarrinhoItens { get; set; }
        public DbSet<Menu> Menu { get; set; }
        public DbSet<MenuPerfil> MenuPerfil { get; set; }
        public DbSet<Tenant> Tenant { get; set; }
    }
}
