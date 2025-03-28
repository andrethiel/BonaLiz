using BonaLiz.Negocio.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace BonaLiz.Negocio.Utils
{
	public static class Arquivo
	{
		public static string Imagem(IFormFile arquivo)
		{
			try
			{
				string nomeArquivo = Guid.NewGuid().ToString() + Path.GetExtension(arquivo.FileName);
				using (var stream = new FileStream(Path.Combine(Directory.GetCurrentDirectory(), "Imagens"), FileMode.Create))
				{
					arquivo.CopyTo(stream);
				}
				

				return nomeArquivo;
			}
			catch (Exception ex) {
				throw new Exception("Erro ao gravar arquivo");
			}
		}

		public static List<ImagemProdutoViewModel> FormataNomeURL(List<ImagemProdutoViewModel> arquivos, IHttpContextAccessor _httpContextAccessor)
		{
			var lista = new List<ImagemProdutoViewModel>();

			foreach(var item in arquivos)
			{
				var arquivo = new ImagemProdutoViewModel();
                if (!string.IsNullOrEmpty(item.NomeArquivo))
                {
                    var request = _httpContextAccessor.HttpContext.Request;
					arquivo.Id = item.Id;
                    arquivo.NomeArquivo = string.Format("{0}://{1}/Imagens/{2}", request.Scheme, request.Host, item.NomeArquivo);
					arquivo.ProdutoId = item.ProdutoId;
                    lista.Add(arquivo);
                }

            }
            return lista;

        }

		public static string RemoveURL(string imagem)
		{
			var arquivo = imagem.Split("/");

			return arquivo.Last().Trim();
		}

		public static void DeletaArquivo(string nomeArquivo)
        {
            try
            {
                File.Delete(Path.Combine(Directory.GetCurrentDirectory(), "Imagens", nomeArquivo));
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
    }
}
