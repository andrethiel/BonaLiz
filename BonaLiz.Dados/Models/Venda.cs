using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Dados.Models
{
	public class Venda : Base
	{
		public int? ClienteId { get; set; }
        public bool? Cancelada { get; set; }
        public DateTime? DataVenda { get; set; }
        public string Status { get; set; } = "Pendente";
        [NotMapped]
		public string NomeCliente { get; set; }
		[NotMapped]
		public string NomeProduto { get; set; }
        // public int? EmpresaId { get; set; }
        List<VendaItens> VendaItens { get; set; } = new List<VendaItens>();
    }
}
