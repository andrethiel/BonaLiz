using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.ViewModels
{
    public class TenantConfig
    {
        public string Nome { get; set; }
        public string CorPrimaria { get; set; }
        public string CorSecundaria { get; set; }
        public string LogoUrl { get; set; }
    }
}
