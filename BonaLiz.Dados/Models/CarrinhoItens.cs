using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Dados.Models
{ 
    public class CarrinhoItens : Base
    {
        public Guid CarrinhoId { get; set; }
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }
    }
}
