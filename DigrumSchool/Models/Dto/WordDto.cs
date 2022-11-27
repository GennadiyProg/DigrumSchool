namespace DigrumSchool.Dto
{
    public class WordDto
    {
        public string Name { get; set; }
        public ICollection<string> Translations { get; set; }
    }
}
