using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Dados.Models
{
    public class Tenant : Base
    {
        public string Nome { get; set; }
        public string Subdominio { get; set; }
        public string CorPrimaria { get; set; }
        public string CorSecundaria { get; set; }
        public string LogoUrl { get; set; }
    }
}
