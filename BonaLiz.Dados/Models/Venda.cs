using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Dados.Models
{
	public class Venda : Base
	{
		public int ClienteId { get; set; }
		public int ProdutoId { get; set; }
		public int Quantidade { get; set; }
		public DateTime DataVenda { get; set; }
	}
}
