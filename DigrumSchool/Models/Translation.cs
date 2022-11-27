namespace DigrumSchool.Models
{
    public class Translation
    {
        public int Id { get; set; }
        public string Value { get; set; }

        public Translation()
        {
        }

        public Translation(string value)
        {
            Value = value;
        }
    }
}
