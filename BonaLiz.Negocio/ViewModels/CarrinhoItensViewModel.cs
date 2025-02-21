using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.ViewModels
{
    public class CarrinhoItensViewModel
    {
        public string CarrinhoId { get; set; }
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }
    }
}
