using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.ViewModels
{
    public class TipoProdutoViewModel
    {
        public int Id { get; set; }
        public Guid? Guid { get; set; }
        public string Nome { get; set; }
		public string? Inativo { get; set; }
	}
}
