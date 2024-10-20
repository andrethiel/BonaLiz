using Microsoft.AspNetCore.Mvc.Rendering;

namespace BonaLiz.Api.Helpers
{
	public static class SelectListHelper
	{
		public static SelectList AddSelectList(SelectList list)
		{
			List<SelectListItem> Lista = list.ToList();
			return new SelectList(Lista, "Value", "Text");
		}
	}
}
