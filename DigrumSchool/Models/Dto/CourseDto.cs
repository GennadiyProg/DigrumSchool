namespace DigrumSchool.Models.Dto
{
    public class CourseDto
    {
        public string GroupName { get; set; }
        public List<string>? Participants { get; set; }
        public List<int>? Tests { get; set; }
    }
}
