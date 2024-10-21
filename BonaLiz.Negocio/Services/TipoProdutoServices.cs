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
    public class TipoProdutoServices : ITipoProdutoServices
    {
        private readonly IMapper _mapper;
        private readonly ITipoProdutoRepository _tipoProdutoRepository;
        public TipoProdutoServices(ITipoProdutoRepository tipoProdutoRepository, IMapper mapper)
        {
            _tipoProdutoRepository = tipoProdutoRepository;
            _mapper = mapper;
        }

        public void Cadastrar(TipoProdutoViewModel model) => _tipoProdutoRepository.Cadastrar(_mapper.Map<TipoProduto>(model));

        public void Editar(TipoProdutoViewModel model)
        {
            var tipoProduto = _tipoProdutoRepository.ObterPorId(model.Id);
            if(tipoProduto != null)
            {
				tipoProduto.Nome = model.Nome;
				tipoProduto.Inativo = Convert.ToBoolean(model.Inativo);

				_tipoProdutoRepository.Editar(tipoProduto);
			}
        }

        public List<TipoProdutoViewModel> Filtrar(TipoProdutoViewModel model) => _tipoProdutoRepository.Filtrar(_mapper.Map<TipoProduto>(model)).Select(x => new TipoProdutoViewModel()
        {
            Id = x.Id,
            Guid = x.Guid,
            Nome = x.Nome,
            Inativo = x.Inativo.ToString()
        }).ToList();

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
