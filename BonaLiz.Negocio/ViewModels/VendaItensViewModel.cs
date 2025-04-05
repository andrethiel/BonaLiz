using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.ViewModels
{
    public class VendaItensViewModel
    {
        public int Id { get; set; }
        public int VendaId { get; set; }
        public string ProdutoId { get; set; }
        public string Quantidade { get; set; }
        public string Valor { get; set; }
    }
}
