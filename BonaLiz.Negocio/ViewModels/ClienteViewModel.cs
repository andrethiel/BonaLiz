using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.ViewModels
{
	public class ClienteViewModel
	{
        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
		public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Inativo { get; set; }
    }
}
