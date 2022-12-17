using DigrumSchool.Config;
using DigrumSchool.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DigrumSchool.Services
{
    public class CourseService
    {
        private readonly SchoolContext _context;
        private readonly TestService testService;

        public CourseService(SchoolContext context, TestService testService)
        {
            _context = context;
            this.testService = testService;
        }

        public Course Create(User creator, string groupName)
        {
            Course course = new Course();
            course.Creator = creator;
            course.GroupName = groupName;
            _context.Courses.Add(course);
            _context.SaveChanges();
            return FindCourseByExpretion(c => c.Id == course.Id) ?? throw new ArgumentNullException();
        }

        public Course? AddParticipant(int courseId, string username)
        {
            Course? course = _context.Courses.Where(c => c.Id == courseId).FirstOrDefault();
            User? participant = _context.Users.Where(u => u.Username == username).FirstOrDefault();
            if (course == null || participant == null)
            {
                return null;
            }
            if (course.Participants == null)
            {
                course.Participants = new List<User>();
            }
            course.Participants.Add(participant);
            _context.SaveChanges();
            return course;
        }

        public Course? AddTest(int courseId, int testId)
        {
            Course? course = _context.Courses.Where(c => c.Id == courseId).FirstOrDefault();
            Test? test = _context.Tests.Where(t => t.Id == testId).FirstOrDefault();
            if (course == null || test == null)
            {
                return null;
            }
            if (course.Tests == null)
            {
                course.Tests = new List<Test>();
            }
            course.Tests.Add(test);
            _context.SaveChanges();
            return course;
        }

        public Course FindById(int courseId)
        {
            return FindCourseByExpretion(c => c.Id == courseId) ?? new Course();
        }

        public List<Course> FindAllByCreator(string username)
        {
            return FindListCoursesByExpretion(c => c.Creator.Username == username) ?? new List<Course>();
        }

        public List<CompletedTest> FindAllCompletedTestsByCourse(int courseId, int? userId)
        {
            return testService.FindCompletedTestListByExpretion(ct => 
                ct.Course != null && ct.Course.Id == courseId && ct.User.Id == userId);
        }

        public void DeleteParticipant(int courseId, int userId)
        {
            Course course = FindCourseByExpretion(c => c.Id == courseId);
            course.Participants.Remove(_context.Users.Where(u => u.Id == userId).First());
            _context.SaveChanges();
        }

        public void DeleteTest(int courseId, int testId)
        {
            Course course = FindCourseByExpretion(c => c.Id == courseId);
            course.Tests.Remove(_context.Tests.Where(t => t.Id == testId).First());
            _context.SaveChanges();
        }

        private Course? FindCourseByExpretion(Expression<Func<Course, bool>> expression)
        {
            return _context.Courses
                .Where(expression)
                .Include(c => c.Participants)
                .Include(c => c.Creator)
                .Include(c => c.Tests)
                .First();
        }

        private List<Course> FindListCoursesByExpretion(Expression<Func<Course, bool>> expression)
        {
            return _context.Courses
                .Where(expression)
                .Include(c => c.Participants)
                .Include(c => c.Creator)
                .Include(c => c.Tests)
                .ToList();
        }
    }
}
