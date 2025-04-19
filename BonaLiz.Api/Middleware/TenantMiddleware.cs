using BonaLiz.Dados.Context;
using System;

namespace BonaLiz.Api.Middleware
{
    public class TenantMiddleware
    {
        private readonly RequestDelegate _next;

        public TenantMiddleware(RequestDelegate next) => _next = next;

        public async Task InvokeAsync(HttpContext context, DataContext _context)
        {
            var host = context.Request.Host.Host;
            var subdominio = host.Split('.')[0];

            var tenant = _context.Tenant.FirstOrDefault(t => t.Subdominio == subdominio);
            if (tenant == null)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync("Tenant não encontrado");
                return;
            }

            context.Items["TenantId"] = tenant.Id;

            await _next(context);
        }
    }
}
