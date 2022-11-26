using DigrumSchool.Config;
using DigrumSchool.Dto;
using DigrumSchool.Models;

namespace DigrumSchool.Services
{
    public class TestService
    {
        private readonly SchoolContext _context;

        public TestService(SchoolContext context)
        {
            _context = context;
        }

        public Test Create(TestDto testDto)
        {
            Test test = new Test();
            test.Title = testDto.Title;
            test.Category = _context.Categories.Where(Category => Category.Name == testDto.Category).FirstOrDefault();
            test.Language = _context.Languages.Where(Languages => Languages.Name == testDto.Language).FirstOrDefault();
            test.Words = testDto.Words;
            test.Courses = testDto.Courses;
            test.IsGeneral = testDto.IsGeneral;
            test.Creator = _context.Users.Where(u => u.IsActive).FirstOrDefault();
            _context.Tests.Add(test);
            _context.SaveChanges();
            return test;
        }
    }
}
