using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.ViewModels
{
    public class ProdutoViewModel
    {
        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
        public string Nome { get; set; }
        public string TipoProdutoId { get; set; }
        public string FornecedorId { get; set; }
        public string PrecoCusto { get; set; }
        public string PrecoVenda { get; set; }
        public string Lucro { get; set; }
        public string DataCompra { get; set; }
        public string Codigo { get; set; }
        public string NomeFornecedor { get; set; }
        public string TipoProduto { get; set; }

    }
}
