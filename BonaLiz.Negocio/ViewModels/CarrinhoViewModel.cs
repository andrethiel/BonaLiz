using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.ViewModels
{
    public class CarrinhoViewModel
    {
        public string CarrinhoId { get; set; }
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }
        public string NomeProduto { get; set; }
        public string NomeCliente { get; set; }
        public string DataCarrinho { get; set; }
        public List<CarrinhoItensViewModel> carrinhoItensViewModels { get; set; }
    }
}
