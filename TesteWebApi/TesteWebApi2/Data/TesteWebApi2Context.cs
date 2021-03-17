using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TesteWebApi2.Models;

namespace TesteWebApi2.Data
{
    public class TesteWebApi2Context : DbContext
    {
        public TesteWebApi2Context (DbContextOptions<TesteWebApi2Context> options)
            : base(options)
        {
        }

        public DbSet<Aluno> Aluno { get; set; }
    }
}
