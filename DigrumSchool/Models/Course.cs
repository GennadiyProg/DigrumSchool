using System.ComponentModel.DataAnnotations.Schema;

namespace DigrumSchool.Models
{
    public class Course
    {
        public int Id { get; set; }
        [ForeignKey("Creator")]
        public int CreatorId { get; set; }
        public User Creator { get; set; }
        public ICollection<User>? Participants { get; set; }
        public ICollection<Test>? Tests { get; set; }
        public string GroupName { get; set; }
    }
}
