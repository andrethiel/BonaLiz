﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Dados.Models
{
    public class ImagemProduto : Base
    {
        public int ProdutoId { get; set; }
        public string NomeImagem { get; set; }
    }
}
