using BonaLiz.Api.Dependencias;
using BonaLiz.Api.Extensions;
using BonaLiz.Dados.Models;
using BonaLiz.Identity.Context;
using BonaLiz.Negocio.Utils;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Reflection.Metadata;
using System.Text.Json.Serialization;

SerilogExtensions.AddSerilog("Api BonaLiz");

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog(Log.Logger);

builder.Services.AddCors();
builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    //c.AddSecurityDefinition("X-API-Key", new OpenApiSecurityScheme
    //{
    //	Description = "",
    //	Type = SecuritySchemeType.ApiKey,
    //	Name = "X-API-Key",
    //	In = ParameterLocation.Header,
    //	Scheme = "ApiKeyScheme"
    //});

    //var key = new OpenApiSecurityScheme()
    //{
    //	Reference = new OpenApiReference()
    //	{
    //		Type = ReferenceType.SecurityScheme,
    //		Id = "X-API-Key"
    //	},
    //	In = ParameterLocation.Header,
    //};

    //var requirement = new OpenApiSecurityRequirement
    //				{
    //						 { key, new List<string>() }
    //				};
    //c.AddSecurityRequirement(requirement);

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme.",
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});
//builder.Services.AddAuthentication(builder.Configuration);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
})
                .AddCookie(options =>
                {
                    options.ExpireTimeSpan = TimeSpan.FromMinutes(20);
                    options.SlidingExpiration = true;
                    options.AccessDeniedPath = "/Forbidden/";
                });
builder.Services.RegisterServices(builder.Configuration);

builder.Services.Configure<IdentityOptions>(x =>
{
    x.Password.RequireDigit = false;
    x.Password.RequireUppercase = false;
    x.Password.RequireLowercase = false;
    x.Password.RequireNonAlphanumeric = false;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder
            .WithOrigins("https://localhost:3000", "http://localhost:3000") // 🔥 Substitua pelo seu domínio real
            .AllowCredentials() // 🔥 ESSENCIAL para cookies HTTP-only funcionarem
            .AllowAnyHeader()
            .AllowAnyMethod());
});


var app = builder.Build();

if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(options => // UseSwaggerUI is called only in Development.
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });

}

app.MapSwagger().RequireAuthorization();

if (!Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), "Imagens")))
{
    Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "Imagens"));
}



app.UseStaticFiles(

    new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Imagens")),
        RequestPath = "/Imagens"
    });


app.UseAuthentication();
app.UseAuthorization();

app.UseCors("AllowFrontend");
app.UseCookiePolicy();
app.MapControllers();

app.UseRequestLocalization("pt-BR");

app.Run();
