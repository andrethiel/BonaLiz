using BonaLiz.Dados.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Identity.Context
{
    public class DataContextIdentity : IdentityDbContext
    {
        public DataContextIdentity(DbContextOptions<DataContextIdentity> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            Roles(builder);
        }

        private static void Roles(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole() { Id = "73487c02-17e4-48ca-9be5-676060fcacb6", ConcurrencyStamp = "1", Name = "Administrador", NormalizedName = "Administrador" },
                new IdentityRole() { Id = "42f21749-302f-4998-8019-9fb7149be720", ConcurrencyStamp = "2", Name = "Usuario", NormalizedName = "Usuario" });
        }
    }
}
