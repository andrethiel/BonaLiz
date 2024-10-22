using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Dados.Models
{
    public class Produto : Base
    {
        public string Nome { get; set; }
        public int Quantidade { get; set; }
        public decimal PrecoCusto { get; set; }
        public decimal PrecoVenda { get; set; }
        public int FornecedorId { get; set; }
        public int TipoProdutoId { get; set; }
        public decimal Lucro { get; set; }
        public DateTime? DataCompra { get; set; }
        public string Codigo { get; set; }
        public bool Inativo { get; set; }
    }
}
