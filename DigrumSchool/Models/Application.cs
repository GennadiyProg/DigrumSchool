namespace DigrumSchool.Models
{
    public class Application
    {
        public int Id { get; set; }
        public Test Test { get; set; }
        public ApplicationStatus Status { get; set; }
    }

    public enum ApplicationStatus
    {
        CREATED,
        APPROVED,
        REJECTED,
        PROCESSED
    }
}
