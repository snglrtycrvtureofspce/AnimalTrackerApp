using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SistemaSolarAPI.Entities;

namespace SistemaSolarAPI.Data
{
    public class SistemaSolarAPIContext : DbContext
    {
        public SistemaSolarAPIContext (DbContextOptions<SistemaSolarAPIContext> options)
            : base(options)
        {
        }

        public DbSet<SistemaSolarAPI.Entities.SistemaSolar> SistemaSolar { get; set; } = default!;

        public DbSet<SistemaSolarAPI.Entities.Planeta> Planeta { get; set; }
    }
}
