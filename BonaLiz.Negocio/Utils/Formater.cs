using System.Globalization;

namespace BonaLiz.Negocio.Helpers
{
	public static class Formater
	{
		public static string FormatarMoeda(decimal valor) {
			return valor.ToString("C", CultureInfo.GetCultureInfo("pt-BR"));
		}
	}
}
