using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Dados.Models
{
    public class Login : Base
    {
        public int ClienteId { get; set; }
        public string Senha { get; set; }
    }
}
