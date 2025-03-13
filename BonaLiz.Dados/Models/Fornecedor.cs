using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Dados.Models
{
    public class Fornecedor : Base
    {
        public string Nome { get; set; }
        public string CNPJ { get; set; }
        public string Estado { get; set; }
        public string Iniciais { get; set; }
		public bool Inativo { get; set; }
        // public int? EmpresaId { get; set; }
    }
}
