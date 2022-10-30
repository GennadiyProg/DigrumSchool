namespace DigrumSchool.Models
{
    public class Test
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Category Category { get; set; }
        public Language Language { get; set; }
        public User Creator { get; set; }
        public List<Word> Words { get; set; }
        public bool IsGeneral { get; set; }
    }
}
