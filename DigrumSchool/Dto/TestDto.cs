using DigrumSchool.Models;

namespace DigrumSchool.Dto
{
    public class TestDto
    {
        public string Title { get; set; }
        public string Category { get; set; }
        public string Language { get; set; }
        public ICollection<Word>? Words { get; set; }
        public ICollection<Course>? Courses { get; set; }
        public bool IsGeneral { get; set; }
    }
}
