namespace DigrumSchool.Models
{
    public class Test
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
        public Language Language { get; set; }
        public int LanguageId { get; set; }
        public User Creator { get; set; }
        public int CreatorId { get; set; }
        public ICollection<Word> Words { get; set; }
        public ICollection<Course> Courses { get; set; }
        public bool IsGeneral { get; set; }
    }
}
