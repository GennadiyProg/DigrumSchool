namespace DigrumSchool.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public List<Course> Courses { get; set; }
        public List<Language> Languages { get; set; }
        public Role Role { get; set; }
    }
}
