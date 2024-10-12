using AutoMapper;
using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using BonaLiz.Negocio.Interfaces;
using BonaLiz.Negocio.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Negocio.Services
{
    public class FornecedorServices : IFornecedorServices
    {
        private readonly IMapper _mapper;
        private readonly IFornecedorRepository _fornecedorRepository;
        public FornecedorServices(IMapper mapper, IFornecedorRepository fornecedorRepository)
        {
            _mapper = mapper;
            _fornecedorRepository = fornecedorRepository;
        }
        void IFornecedorServices.Editar(FornecedorViewModel model)
        {
            var fornecedor = _fornecedorRepository.ObterPorId(model.Id);
            fornecedor.Nome = model.Nome;
            fornecedor.CNPJ = model.CNPJ;
            fornecedor.Estado = model.Estado;
            fornecedor.Iniciais = model.Iniciais;
            _fornecedorRepository.Editar(fornecedor);
        }

        void IFornecedorServices.Inserir(FornecedorViewModel model)
        {
            try
            {
                _fornecedorRepository.Inserir(_mapper.Map<Fornecedor>(model));
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        List<FornecedorViewModel> IFornecedorServices.Listar() => _fornecedorRepository.Listar().Select(fornecedor => new FornecedorViewModel()
        {
            Id = fornecedor.Id,
            Guid = fornecedor.Guid,
            Nome = fornecedor.Nome,
            CNPJ = fornecedor.CNPJ,
            Estado = fornecedor.Estado,
            Iniciais = fornecedor.Iniciais

        }).ToList();

        FornecedorViewModel IFornecedorServices.ObterPorId(int id)
        {
            var fornecedor = _fornecedorRepository.ObterPorId(id);

            return new FornecedorViewModel()
            {
                Id = fornecedor.Id,
                Guid = fornecedor.Guid,
                Nome = fornecedor.Nome,
                CNPJ = fornecedor.CNPJ,
                Estado = fornecedor.Estado,
                Iniciais = fornecedor.Iniciais
            };
        }

        FornecedorViewModel IFornecedorServices.ObterPorGuid(Guid guid)
        {
            var fornecedor = _fornecedorRepository.ObterPorGuid(guid);

            if(fornecedor != null)
            {
                return new FornecedorViewModel()
                {
                    Id = fornecedor.Id,
                    Guid = fornecedor.Guid,
                    Nome = fornecedor.Nome,
                    CNPJ = fornecedor.CNPJ,
                    Estado = fornecedor.Estado,
                    Iniciais = fornecedor.Iniciais
                };
            }
            else
            {
                return new FornecedorViewModel();
            }
        }
        List<FornecedorViewModel> IFornecedorServices.Filtrar(FornecedorViewModel model)
        {
            var fornecedor = _fornecedorRepository.Filtrar(_mapper.Map<Fornecedor>(model));

            if (fornecedor.Count() > 0)
            {
                return fornecedor.Select(x => new FornecedorViewModel()
                {
                    Id = x.Id,
                    Guid = x.Guid,
                    Nome = x.Nome,
                    CNPJ = x.CNPJ,
                    Estado = x.Estado,
                    Iniciais = x.Iniciais

                }).ToList();
            }
            else
            {
                return new List<FornecedorViewModel>();
            }
        }
    }
}
