using AutoMapper;
using BonaLiz.Dados.Models;
using BonaLiz.Negocio.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() 
        {
            CreateMap<FornecedorViewModel, Fornecedor>().ReverseMap();
            CreateMap<TipoProdutoViewModel, TipoProduto>().ReverseMap();
            CreateMap<ProdutoViewModel, Produto>().ReverseMap();
        }
    }
}
