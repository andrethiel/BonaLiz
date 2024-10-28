using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace BonaLiz.Negocio.Utils
{
	public static class Arquivo
	{
		private static IConfiguration _configuration;

		public static void SettingsConfigure(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public static string Imagem(IFormFile arquivo)
		{
			try
			{
				string nomeArquivo = Guid.NewGuid().ToString() + Path.GetExtension(arquivo.FileName);
				using (var stream = new FileStream(Path.Combine(Caminho("CaminhoArquivo"), nomeArquivo), FileMode.Create))
				{
					arquivo.CopyTo(stream);
				}
				

				return nomeArquivo;
			}
			catch (Exception ex) {
				throw new Exception();
			}
		}

		public static string FormataNomeURL(string nome, IHttpContextAccessor _httpContextAccessor)
		{
			if (!string.IsNullOrEmpty(nome))
			{
				var request = _httpContextAccessor.HttpContext.Request;
				return string.Format("{0}://{1}/Imagens/{2}", request.Scheme, request.Host, nome);
			}
			return "";
		}

		public static string Caminho(string key)
		{
			return _configuration.GetSection(key).Value;
		}
	}
}
