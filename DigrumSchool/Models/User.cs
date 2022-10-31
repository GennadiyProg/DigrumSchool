using System.ComponentModel.DataAnnotations;

namespace DigrumSchool.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public ICollection<Course> Courses { get; set; }
        public ICollection<Language> Languages { get; set; }
        public Role Role { get; set; }
        public int RoleId { get; set; }
    }
}
