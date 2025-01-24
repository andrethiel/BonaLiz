using BonaLiz.Dados.Context;
using BonaLiz.Dados.Models;
using BonaLiz.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Domain.Repository
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly IRepositoryBase<Cliente> _repositoryBase;

        public ClienteRepository(IRepositoryBase<Cliente> repositoryBase)
        {
            _repositoryBase = repositoryBase;
        }
        public void Editar(Cliente model) => _repositoryBase.Editar(model);

        public List<Cliente> Filtrar(Cliente model)
        {
            var filtro = _repositoryBase.Filtrar(Expressions.PredicateBuilder.And<Cliente>(x => string.IsNullOrEmpty(model.Nome) || x.Nome.Contains(model.Nome), 
                x => string.IsNullOrEmpty(model.Email) || x.Email.Contains(model.Email)));

            if(filtro.Count() == 0)
            {
                return new List<Cliente>();
            }

            return filtro;
        }

        public void Inserir(Cliente model) => _repositoryBase.Inserir(model);

        public List<Cliente> Listar() => _repositoryBase.Listar();

        public Cliente ObterPorGuid(Guid Guid) => _repositoryBase.ObterPorGuid(Guid);

        public Cliente ObterPorId(int id) => _repositoryBase.ObterPorId(id);
    }
}
