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
    public class FornecedorServices(IFornecedorRepository _fornecedorRepository) : IFornecedorServices
    {
        FornecedorViewModel IFornecedorServices.Editar(FornecedorViewModel model)
        {
            var fornecedor = _fornecedorRepository.ObterPorId(model.Id.Value);
            if(fornecedor != null)
            {
                fornecedor.Id = model.Id.Value;
                fornecedor.Guid = model.Guid.Value;
                fornecedor.Nome = model.Nome;
				fornecedor.CNPJ = model.CNPJ;
				fornecedor.Estado = model.Estado;
                fornecedor.Inativo = Convert.ToBoolean(model.Inativo);

                var entity = _fornecedorRepository.Editar(fornecedor);

                return new FornecedorViewModel
                {
                    Id = fornecedor.Id,
                    CNPJ = entity.CNPJ,
                    Guid = entity.Guid,
                    Estado = entity.Estado,
                    Nome = entity.Nome,
                    Inativo = entity.Inativo.ToString()
                };
			}

            return new FornecedorViewModel();

        }

        FornecedorViewModel IFornecedorServices.Inserir(FornecedorViewModel model)
        {
            try
            {
                var fornecedor = new Fornecedor()
                {
                    Guid = Guid.NewGuid(),
                    CNPJ = model.CNPJ,
                    Estado = model.Estado,
                    Nome = model.Nome,
                    Inativo = false
                };

                var entity = _fornecedorRepository.Inserir(fornecedor);

                return new FornecedorViewModel
                {
                    Id = entity.Id,
                    CNPJ = entity.CNPJ,
                    Guid = entity.Guid,
                    Estado = entity.Estado,
                    Nome = entity.Nome,
                    Inativo = entity.Inativo.ToString()
                };
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
            Inativo = fornecedor.Inativo.ToString()

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
				Inativo = fornecedor.Inativo.ToString()
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
					Inativo = fornecedor.Inativo.ToString()
				};
            }
            else
            {
                return new FornecedorViewModel();
            }
        }
        List<FornecedorViewModel> IFornecedorServices.Filtrar(FornecedorViewModel model)
        {
            var fornecedor = new Fornecedor()
            {
                CNPJ = model.CNPJ,
                Estado = model.Estado,
                Nome = model.Nome,
                Inativo = model.Inativo != null ? Convert.ToBoolean(model.Inativo) : null,
            };


            var listaFornecedor = _fornecedorRepository.Filtrar(fornecedor);

            if (listaFornecedor.Count() > 0)
            {
                return listaFornecedor.Select(x => new FornecedorViewModel()
                {
                    Id = x.Id,
                    Guid = x.Guid,
                    Nome = x.Nome,
                    CNPJ = x.CNPJ,
                    Estado = x.Estado,
					Inativo = x.Inativo.ToString()

				}).ToList();
            }
            else
            {
                return new List<FornecedorViewModel>();
            }
        }
    }
}
