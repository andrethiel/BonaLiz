
using BonaLiz.Api.Dependencias;
using BonaLiz.Negocio.Utils;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.RegisterServices(builder.Configuration);

var app = builder.Build();

Arquivo.SettingsConfigure(app.Services.GetRequiredService<IConfiguration>());

if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(options => // UseSwaggerUI is called only in Development.
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });

}
app.UseStaticFiles(
	new StaticFileOptions
	{
		FileProvider = new PhysicalFileProvider(builder.Configuration.GetSection("CaminhoArquivo").Value),
		RequestPath = "/Imagens"
	});
app.UseCors(builder => builder
            .SetIsOriginAllowed(orign => true)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
app.MapControllers();

app.UseRequestLocalization("pt-BR");

app.Run();
