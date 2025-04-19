using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Dados.Models
{
    public class Carrinho : Base
    {
        [Key]
        public Guid CarrinhoId { get; set; }
        public int ClienteId { get; set; }
        public DateTime DataCarrinho { get; set; }
        public Guid TenantId { get; set; }

        [NotMapped]
        public List<CarrinhoItens> CarrinhoItens { get; set; }
    }
}
