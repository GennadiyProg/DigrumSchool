namespace DigrumSchool.Models
{
    public class Word
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Translate Translate { get; set; }
        public int TranslateID { get; set; }
        public ICollection<Test> Tests { get; set; }
    }
}
