using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BonaLiz.Api.Authentication
{
	public class ApiKeyAttribute : Attribute, IAsyncActionFilter
	{
		private const string APIKEY = "X-API-Key";

		public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
		{
			if (!context.HttpContext.Request.Headers.TryGetValue(APIKEY, out var apiKey))

            {
				context.Result = new ContentResult()
				{
					StatusCode = 401,
					Content = "ApiKey não encontrada/Token não encontrado"
                };
				return;
			}

			var key = "43e4dbf0-52ed-4203-895d-42b586496bd4";
			if (!key.Equals(apiKey))
			{
				context.Result = new ContentResult()
				{
					StatusCode = 403,
					Content = "Acesso não autorizado"
				};
				return;
			}
			await next();

		}
	}
}
