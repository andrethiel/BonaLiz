using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.ViewModels
{
    public class ImagemProdutoViewModel
    {
        public int Id { get; set; }
        public int ProdutoId { get; set; }
        public string NomeArquivo { get; set; }
    }
}
