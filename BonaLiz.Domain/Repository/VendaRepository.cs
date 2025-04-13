using BonaLiz.Dados.Context;
using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;

namespace BonaLiz.Domain.Repository
{
	public class VendaRepository(IRepositoryBase<Venda> _repositoryBase, IRepositoryBase<VendaItens> _repositoryBaseVendaItens) : IVendaRepository
	{
		public Venda Inserir(Venda model)
		{
			return _repositoryBase.Inserir(model);
        }

		public List<Venda> Listar() => _repositoryBase.Listar();

        public Venda ObterPorGuid(Guid guid) => _repositoryBase.ObterPorGuid(guid);

		public List<Venda> Filtrar(Venda model) => _repositoryBase.Listar();
		public Venda Cancelar(int id)
		{
			var venda = _repositoryBase.ObterPorId(id);
            if (venda != null)
			{
				venda.Cancelada = true;
				return _repositoryBase.Editar(venda);
            }

			return venda!;
		}

		public Venda StatusVenda(int id, string status)
		{
			var venda = _repositoryBase.ObterPorId(id);

            if (venda != null)
			{
				venda.Status = status;
                return _repositoryBase.Editar(venda);
            }

			return venda!;
		}

        public VendaItens InserirItemVenda(VendaItens model)
        {
            return _repositoryBaseVendaItens.Inserir(model);
        }

		public List<VendaItens> ListarItens() => _repositoryBaseVendaItens.Listar();
    }
}
