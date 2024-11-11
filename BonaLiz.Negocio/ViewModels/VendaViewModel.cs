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
		public string ClienteId { get; set; }
        public string ProdutoId { get; set; }
        public string Quantidade { get; set; }
        public string Valor { get; set; }
        public string NomeProduto { get; set; }
        public string NomeCliente { get; set; }
		public string DataVenda { get; set; }
        public string Cancelada { get; set; }
    }
}
