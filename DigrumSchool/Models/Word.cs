using System.Text.Json.Serialization;

namespace DigrumSchool.Models
{
    public class Word
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Translation> Translations { get; set; }
        [JsonIgnore]
        public ICollection<Test> Tests { get; set; }
    }
}
