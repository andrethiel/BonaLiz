using BonaLiz.Api.Dependencias;
using BonaLiz.Api.Extensions;
using BonaLiz.Negocio.Utils;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Text.Json.Serialization;

SerilogExtensions.AddSerilog("Api BonaLiz");

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog(Log.Logger);

builder.Services.AddCors();
builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
	c.AddSecurityDefinition("X-API-Key", new OpenApiSecurityScheme
	{
		Description = "",
		Type = SecuritySchemeType.ApiKey,
		Name = "X-API-Key",
		In = ParameterLocation.Header,
		Scheme = "ApiKeyScheme"
	});

	var key = new OpenApiSecurityScheme()
	{
		Reference = new OpenApiReference()
		{
			Type = ReferenceType.SecurityScheme,
			Id = "X-API-Key"
		},
		In = ParameterLocation.Header,
	};

	var requirement = new OpenApiSecurityRequirement
					{
							 { key, new List<string>() }
					};
	c.AddSecurityRequirement(requirement);
});
builder.Services.RegisterServices(builder.Configuration);

var app = builder.Build();

Arquivo.SettingsConfigure(app.Services.GetRequiredService<IConfiguration>());

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI(options => // UseSwaggerUI is called only in Development.
	{
		options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
		options.RoutePrefix = string.Empty;
	});

}

app.MapSwagger().RequireAuthorization();

if(!Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), "Imagens")))
{
	Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "Imagens"));
}



app.UseStaticFiles(

    new StaticFileOptions
	{
		FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Imagens")),
		RequestPath = "/Imagens"
	});
app.UseCors(builder => builder
			.SetIsOriginAllowed(orign => true)
			.AllowAnyMethod()
			.AllowAnyHeader()
			.AllowCredentials());

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.UseRequestLocalization("pt-BR");

app.Run();
