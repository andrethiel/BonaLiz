namespace BonaLiz.Api.Utils
{
	public static class Arquivo
	{
		private static IConfiguration _configuration;
		public static string Imagem(IFormFile arquivo)
		{
			try
			{
				string nomeArquivo = Guid.NewGuid().ToString() + Path.GetExtension(arquivo.FileName);
				var stream = new FileStream(Path.Combine(Caminho("CaminhoArquivo"), nomeArquivo), FileMode.Create);
				arquivo.CopyTo(stream);

				return nomeArquivo;
			}
			catch (Exception ex) {
				throw new Exception();
			}
		}

		public static string Caminho(string key)
		{
			return _configuration.GetSection(key).Value;
		}
	}
}
