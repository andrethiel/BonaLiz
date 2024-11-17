using System.Globalization;

namespace BonaLiz.Negocio.Helpers
{
	public static class Formater
	{
		public static string FormatarMoeda(double valor) {
			return valor.ToString("C");
		}
	}
}
