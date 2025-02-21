using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Dados.Models
{
    public abstract class Base
    {
        [Key]
        public int Id { get; set; }
        public Guid Guid { get; set; }
    }
}
