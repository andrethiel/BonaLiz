using BonaLiz.Api.Dependencias;
using BonaLiz.Api.Extensions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Reflection.Metadata;
using System.Text.Json.Serialization;
using BonaLiz.RabbitMQ.MassTransit;
using BonaLiz.Api.Middleware;

//SerilogExtensions.AddSerilog("Api BonaLiz");

var builder = WebApplication.CreateBuilder(args);

//builder.Host.UseSerilog(Log.Logger);

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
            .WithOrigins("https://localhost:3000", "http://localhost:3000", "https://localhost:3001", "http://localhost:3001", "https://catalogo.bonaliz.com.br") // 🔥 Substitua pelo seu domínio real
            .AllowCredentials()
            .AllowAnyHeader()
            .AllowAnyMethod());
});

if (builder.Configuration.GetValue<bool>("RabbitMqEnable"))
{
    builder.Services.AddMassTransitPublisher(builder.Configuration);
}

var app = builder.Build();

app.UseMiddleware<TenantMiddleware>();

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
