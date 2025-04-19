using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Dados.Models
{
	public class Cliente : Base
	{
		public string Nome { get; set; }
		public string Email { get; set; }
		public string Telefone { get; set; }
        public bool Inativo { get; set; }
        public Guid TenantId { get; set; }
    }
}
