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
        [JsonIgnore]
        public ICollection<Course> Courses { get; set; }
        [JsonIgnore]
        public ICollection<Course> CreatedCourses { get; set; }
        public ICollection<Language> Languages { get; set; }
        public Role Role { get; set; }
    }
}
