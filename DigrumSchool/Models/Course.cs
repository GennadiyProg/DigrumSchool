namespace DigrumSchool.Models
{
    public class Course
    {
        public int Id { get; set; }
        public User Creator { get; set; }
        public List<User> Participants { get; set; }
        public List<Test> Tests { get; set; }
        public string GroupName { get; set; }
    }
}
