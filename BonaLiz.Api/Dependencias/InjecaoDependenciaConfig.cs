using BonaLiz.Dados.Context;
using BonaLiz.Domain.Interfaces;
using BonaLiz.Domain.Repository;
using BonaLiz.Negocio.AutoMapper;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.Services;
using Microsoft.EntityFrameworkCore;

namespace BonaLiz.Api.Dependencias
{
    public static class InjecaoDependenciaConfig
    {
        public static void RegisterServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DataContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
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
            services.AddScoped<ILoginServices, LoginServices>();
            services.AddScoped<IImagemRepository, ImagemRepository>();
            services.AddScoped<IImagemServices, ImagemServices>();


            services.AddAutoMapper(typeof(AutoMapperConfiguration));
            AutoMapperConfiguration.Mapper();
        }
    }
}
