namespace DigrumSchool.Models.Dto
{
    public class CourseDto
    {
        public string Name { get; set; }
        public List<string>? Participants { get; set; }
        public List<int>? Tests { get; set; }
    }
}
