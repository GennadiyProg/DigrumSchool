namespace DigrumSchool.Models.Dto
{
    public class CourseUpdateDto
    {
        public int Id { get; set; }
        public string GroupName { get; set; }
        public List<string>? Participants { get; set; }
        public List<int>? Tests { get; set; }
    }
}
