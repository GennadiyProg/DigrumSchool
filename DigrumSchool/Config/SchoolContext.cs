using DigrumSchool.Models;
using Microsoft.EntityFrameworkCore;

namespace DigrumSchool.Config
{
    public class SchoolContext : DbContext
    {
        public SchoolContext(DbContextOptions<SchoolContext> options) : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<CompletedTest> CompletedTests { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<Translate> Translates { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Word> Words { get; set; }
    }
}
