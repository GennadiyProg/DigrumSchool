using DigrumSchool.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace DigrumSchool.Config
{
    public class SchoolContext : DbContext
    {
        public DbSet<Role> Roles { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<CompletedTest> CompletedTests { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<Translation> Translations { get; set; }
        public DbSet<Word> Words { get; set; }

        public SchoolContext(DbContextOptions<SchoolContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>()
                .HasOne(c => c.Creator)
                .WithMany(u => u.CreatedCourses)
                .HasForeignKey(c => c.CreatorId);

            modelBuilder.Entity<Test>()
                .HasOne(t => t.Language)
                .WithMany()
                .HasForeignKey("LanguageId")
                .IsRequired();

            modelBuilder.Entity<Test>()
                .HasOne(t => t.Category)
                .WithMany()
                .HasForeignKey("CategoryId")
                .IsRequired();

            modelBuilder.Entity<Test>()
                .HasOne(t => t.Creator)
                .WithMany()
                .HasForeignKey("CreatorId")
                .IsRequired();

            modelBuilder.Entity<Test>()
                .HasMany(t => t.CompletedTests)
                .WithOne(ct => ct.Test)
                .HasForeignKey("TestId")
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany()
                .HasForeignKey("RoleId")
                .IsRequired();

            modelBuilder.Entity<CompletedTest>()
                .HasOne(t => t.User)
                .WithMany()
                .HasForeignKey("UserId")
                .IsRequired();

            modelBuilder.Entity<CompletedTest>()
                .HasOne(t => t.Course)
                .WithMany()
                .HasForeignKey("CourseId")
                .IsRequired(false);
        }
    }
}
