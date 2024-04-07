using agenda_on_api_netcore.Entities;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace agenda_on_api_netcore
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<Gestor> Gestores { get; set; }
        public DbSet<Colaborador> Colaboradores { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Servico> Servicos { get; set; }
        public DbSet<StatusAtendimento> StatusAtendimentos { get; set; }
        public DbSet<Calendario> Calendarios { get; set; }
        public DbSet<Agendamento> Agendamentos { get; set; }
        public DbSet<Comissao> Comissoes { get; set; }
        public DbSet<ServicoAgendamento> ServicoAgendamentos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Gestor>()
                .HasIndex(g => g.Email)
                .IsUnique();

            modelBuilder.Entity<Colaborador>()
                .HasIndex(c => c.Email)
                .IsUnique();

            modelBuilder.Entity<Cliente>()
                .HasIndex(c => c.Email)
                .IsUnique();

            modelBuilder.Entity<Calendario>()
                 .HasOne(c => c.Gestor)
                 .WithMany(g => g.Calendarios)
                 .HasForeignKey(c => c.GestorId).IsRequired(false)
                 .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Calendario>()
                .HasOne(c => c.Colaborador)
                .WithMany(co => co.Calendarios)
                .HasForeignKey(c => c.ColaboradorId).IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Agendamento>()
                .HasOne(a => a.Colaborador)
                .WithMany(co => co.Agendamentos)
                .HasForeignKey(a => a.ColaboradorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Agendamento>()
                .HasOne(a => a.Cliente)
                .WithMany(c => c.Agendamentos) 
                .HasForeignKey(a => a.ClienteId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Agendamento>()
                .HasOne(a => a.Calendario)
                .WithMany(ca => ca.Agendamentos)
                .HasForeignKey(a => a.CalendarioId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Agendamento>()
                .HasOne(a => a.StatusAtendimento)
                .WithMany(st => st.Agendamentos) 
                .HasForeignKey(a => a.StatusId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Comissao>()
                .HasOne(c => c.Colaborador)
                .WithMany(co => co.Comissoes)
                .HasForeignKey(c => c.ColaboradorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Comissao>()
                .HasOne(c => c.Servico)
                .WithMany(s => s.Comissoes)
                .HasForeignKey(c => c.ServicoId)
                .OnDelete(DeleteBehavior.Restrict);
          
            modelBuilder.Entity<ServicoAgendamento>()
                .HasKey(sa => sa.ServicoAgendamentoId);

            modelBuilder.Entity<ServicoAgendamento>()
                .HasOne(sa => sa.Agendamento)
                .WithMany(a => a.ServicoAgendamentos)
                .HasForeignKey(sa => sa.AgendamentoId);

            modelBuilder.Entity<ServicoAgendamento>()
                .HasOne(sa => sa.Servico)
                .WithMany(s => s.ServicoAgendamentos)
                .HasForeignKey(sa => sa.ServicoId);

            modelBuilder.Entity<StatusAtendimento>()
                .HasKey(sa => sa.StatusId);
        }
    }
}
