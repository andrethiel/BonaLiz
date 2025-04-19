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
        public string NomeProduto { get; set; }
        public string NomeCliente { get; set; }
        public string TelefoneCliente { get; set; }
        public string EmailCliente { get; set; }
        public string Valor { get; set; }
        public string imagemProduto { get; set; }
    }
}
