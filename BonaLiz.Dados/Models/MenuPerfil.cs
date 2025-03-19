using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Dados.Models
{
    public class MenuPerfil : Base
    {
        public int IdMenu { get; set; }
        public string IdPerfil { get; set; }
    }
}
