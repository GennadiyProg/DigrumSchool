namespace DigrumSchool.Models
{
    public class CompletedTest
    {
        public int Id { get; set; }
        public User User { get; set; }
        public Test? Test { get; set; }
        public int Score { get; set; }
        public DateTime Date { get; set; }
        public Course? Course { get; set; }
    }
}
