using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DigrumSchool.Models
{
    public class User
    {
        public int Id { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        public string Username { get; set; }
        public ICollection<Course> Courses { get; set; }
        public ICollection<Course> CreatedCourses { get; set; }
        public ICollection<Language> Languages { get; set; }
        public Role Role { get; set; }
        public int RoleId { get; set; }
        public bool IsActive { get; set; }
    }
}
