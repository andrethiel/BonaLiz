using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.ViewModels
{
	public class VendaViewModel
	{
        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
		public int ClienteId { get; set; }
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }
        public DateTime DataVenda { get; set; }
    }
}
