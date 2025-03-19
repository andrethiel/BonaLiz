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
	public class VendaRepository(IRepositoryBase<Venda> _repositoryBase) : IVendaRepository
	{
		public void Inserir(Venda model)
		{
			model.DataVenda = DateTime.Now;
			_repositoryBase.Inserir(model);
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
				_repositoryBase.Editar(venda);
            }

			return venda;
		}

		public void StatusVenda(int id, string status)
		{
			var venda = _repositoryBase.ObterPorId(id);

            if (venda != null)
			{
				venda.Status = status;
                _repositoryBase.Editar(venda);
            }
		}
    }
}
