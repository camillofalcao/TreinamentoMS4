using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ContatosDomain.Models;

namespace ContatosInfraestructure.Data
{
    public class ContatosApplicationContext : DbContext
    {
        public ContatosApplicationContext (DbContextOptions<ContatosApplicationContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contato>()
                .HasMany(e => e.Numeros)
                .WithOne()
                .HasForeignKey(p => p.ContatoId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Contato>()
                .Property(x => x.ContatoId)
                .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<ContatoNumero>()
                .Property(x => x.ContatoNumeroId)
                .HasDefaultValueSql("NEWID()");
        }

        public DbSet<Contato> Contato { get; set; }
        public DbSet<ContatoNumero> ContatoNumero { get; set; }
    }
}
