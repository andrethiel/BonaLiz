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
    public class RepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : Base
    {
        private readonly DataContext _context;
        public readonly DbSet<TEntity> _DbSet;

        public RepositoryBase(DataContext context)
        {
            _context = context;
            _DbSet = _context.Set<TEntity>();
        }

        public TEntity ObterPorGuid(Guid Guid) => _DbSet.Where(x=> x.Guid.Equals(Guid)).First();
        public TEntity ObterPorId(int id) => _DbSet.Find(id);
        public List<TEntity> Listar()
        {
            try
            {
                return _DbSet.ToList();
            }
            catch(TaskCanceledException ex) { throw; }
            
        }
        public TEntity Inserir(TEntity model)
        {
             _DbSet.Add(model);
            model.Id = _context.SaveChanges();
            return model;
        }

        public int InserirScalar(TEntity model)
        {
            _DbSet.Add(model);
            _context.SaveChanges();

            return model.Id;
        }

        public void InserirRange(List<TEntity> model)
        {
            _DbSet.AddRange(model);
            _context.SaveChanges();
        }

        public TEntity Editar(TEntity model)
        {
            _DbSet.Update(model);
            _context.SaveChanges();
            return model;

        }

        public List<TEntity> Filtrar(Expression<Func<TEntity, bool>> filter = null)
        {
            var query = _DbSet.AsQueryable();
            if (filter != null)
                query = query.Where(filter).AsNoTracking();

            return query.ToList();
        }

        public void Deletar(TEntity id)
        {
            _DbSet.Remove(id);
            _context.SaveChanges();
        }
    }
}
