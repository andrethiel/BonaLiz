using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Dados.Models
{
    public class Menu : Base
    {
        public int? IdMenuPai { get; set; }
        public string Nome { get; set; }
        public string Url { get; set; }
        public string Icone { get; set; }
        public int Ordem { get; set; }
    }
}
