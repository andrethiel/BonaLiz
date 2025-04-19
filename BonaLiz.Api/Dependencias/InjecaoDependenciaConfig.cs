using BonaLiz.Dados.Context;
using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using BonaLiz.Domain.Repository;
using BonaLiz.Identity.Context;
using BonaLiz.Identity.Interfaces;
using BonaLiz.Identity.Services;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BonaLiz.Api.Dependencias
{
    public static class InjecaoDependenciaConfig
    {
        public static void RegisterServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DataContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")).EnableSensitiveDataLogging());
            services.AddDbContext<DataContextIdentity>(option => option.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped<DataContext, DataContext>();
			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddScoped(typeof(IRepositoryBase<>), typeof(RepositoryBase<>));

            services.AddScoped<IFornecedorRepository, FornecedorRepository>();
            services.AddScoped<IFornecedorServices, FornecedorServices>();
            services.AddScoped<ITipoProdutoRepository, TipoProdutoRepository>();
            services.AddScoped<ITipoProdutoServices, TipoProdutoServices>();
            services.AddScoped<IProdutoRepository, ProdutoRepository>();
            services.AddScoped<IProdutoServices, ProdutoServices>();
			services.AddScoped<IClienteRepository, ClienteRepository>();
			services.AddScoped<IClienteServices, ClienteServices>();
			services.AddScoped<IVendaRepository, VendaRepository>();
			services.AddScoped<IVendaServices, VendaServices>();
            services.AddScoped<IImagemRepository, ImagemRepository>();
            services.AddScoped<IImagemServices, ImagemServices>();
            services.AddScoped<ICarrinhoRepository, CarrinhoRepository>();
            services.AddScoped<ICarrinhoServices, CarrinhoServices>();
            services.AddScoped<IClienteCarrinhoServices, ClienteCarrinhoServices>();
            services.AddScoped<ICheckoutServices, CheckoutServices>();
            services.AddScoped<IIdentityService, IdentityService>();

            services.AddScoped<IMenuRepository, MenuRepository>();
            services.AddScoped<IMenuServices, MenuServices>();

            services.AddScoped<ITenantRepository, TenantRepository>();
            services.AddScoped<ITenantServices, TenantServices>();


            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<DataContextIdentity>()
                .AddDefaultTokenProviders();
        }
    }
}
