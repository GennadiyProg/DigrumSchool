namespace DigrumSchool.Models.Dto
{
    public class CompletedTestDto
    {
        public int TestId { get; set; }
        public int Score { get; set; }
        public int? CourseId { get; set; }
    }
}
