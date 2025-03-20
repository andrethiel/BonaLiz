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
    public class TipoProdutoServices(ITipoProdutoRepository _tipoProdutoRepository) : ITipoProdutoServices
    {
        public TipoProdutoViewModel Cadastrar(TipoProdutoViewModel model)
        {
            var tipoProduto = new TipoProduto()
            {
                Guid = Guid.NewGuid(),
                Nome = model.Nome,
                Inativo = false
            };
            var entity = _tipoProdutoRepository.Cadastrar(tipoProduto);
            
            return new TipoProdutoViewModel()
            {
                Id = entity.Id,
                Guid = entity.Guid,
                Nome = entity.Nome,
                Inativo = entity.Inativo.ToString()
            };
        }

        public TipoProdutoViewModel Editar(TipoProdutoViewModel model)
        {
            var tipoProduto = _tipoProdutoRepository.ObterPorId(model.Id);
            if(tipoProduto != null)
            {
				tipoProduto.Nome = model.Nome;
				tipoProduto.Inativo = Convert.ToBoolean(model.Inativo);

				var entity = _tipoProdutoRepository.Editar(tipoProduto);

                return new TipoProdutoViewModel()
                {
                    Id = entity.Id,
                    Guid = entity.Guid,
                    Nome = entity.Nome,
                    Inativo = entity.Inativo.ToString()
                };
            }
            else
            {
                return new TipoProdutoViewModel();
            }
        }

        public List<TipoProdutoViewModel> Filtrar(TipoProdutoViewModel model)
        {
            var tipoProduto = new TipoProduto()
            {
                Nome = model.Nome,
                Inativo = model.Inativo != null ? Convert.ToBoolean(model.Inativo) : null,
            };



            return _tipoProdutoRepository.Filtrar(tipoProduto).Select(x => new TipoProdutoViewModel()
            {
                Id = x.Id,
                Guid = x.Guid,
                Nome = x.Nome,
                Inativo = x.Inativo.ToString()
            }).ToList();
        }

        public List<TipoProdutoViewModel> Listar() => _tipoProdutoRepository.Listar().Select(x => new TipoProdutoViewModel()
        {
            Id = x.Id,
            Guid = x.Guid,
            Nome = x.Nome,
			Inativo = x.Inativo.ToString()
		}).ToList();

        public TipoProdutoViewModel ObterPorGuid(Guid guid)
        {
            var tipoProduto = _tipoProdutoRepository.ObterPorGuid(guid);
            if(tipoProduto != null)
            {
				return new TipoProdutoViewModel()
				{
					Id = tipoProduto.Id,
					Guid = tipoProduto.Guid,
					Nome = tipoProduto.Nome,
                    Inativo = tipoProduto.Inativo.ToString(),
				};
            }
            else
            {
                return new TipoProdutoViewModel();

			}
        }

        public TipoProdutoViewModel ObterPorId(int id)
        {
            var tipoProduto = _tipoProdutoRepository.ObterPorId(id);
			if (tipoProduto != null)
			{
				return new TipoProdutoViewModel()
				{
					Id = tipoProduto.Id,
					Guid = tipoProduto.Guid,
					Nome = tipoProduto.Nome,
					Inativo = tipoProduto.Inativo.ToString(),
				};
			}
			else
			{
				return new TipoProdutoViewModel();

			}
		}
    }
}
