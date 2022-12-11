using System.Text.Json.Serialization;

namespace DigrumSchool.Models
{
    public class Language
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public ICollection<User> Users { get; set; }
    }
}
