using DigrumSchool.Config;
using DigrumSchool.Dto;
using DigrumSchool.Models;
using DigrumSchool.Models.Dto;

namespace DigrumSchool.Services
{
    public class TestService
    {
        private readonly SchoolContext _context;

        public TestService(SchoolContext context)
        {
            _context = context;
        }

        public Test Create(TestDto testDto, User currentUser)
        {
            Test test = new Test();
            test.Title = testDto.Title;
            test.Category = _context.Categories.Where(Category => Category.Name == testDto.Category).FirstOrDefault();
            test.Language = _context.Languages.Where(Languages => Languages.Name == testDto.Language).FirstOrDefault();
            test.Words = new List<Word>();
            foreach(var word in testDto.Words)
            {
                Word newWord = new Word();
                newWord.Name = word.Name;
                newWord.Translations = new List<Translation>();
                List<Translation> foundTranslations = _context.Translations.Where(t => word.Translations.Contains(t.Value)).ToList();
                foundTranslations.ForEach(t => newWord.Translations.Add(t));
                if(foundTranslations.Count != word.Translations.Count)
                {
                    foreach(string translation in word.Translations)
                    {
                        if(!foundTranslations.Any(t => t.Value == translation))
                        {
                            newWord.Translations.Add(new Translation(translation));
                        }
                    }
                }
                test.Words.Add(newWord);
            }
            test.IsGeneral = testDto.IsGeneral;
            test.Creator = currentUser;
            _context.Tests.Add(test);
            _context.SaveChanges();
            return test;
        }

        public List<Test> FindAllTestsByCreator(string username)
        {
            return _context.Tests.Where(t => t.Creator.Username == username).ToList();
        }

        public Test FindById(int id)
        {
            return _context.Tests.Where(t => t.Id == id).FirstOrDefault() ?? new Test();
        }

        public CompletedTest CompleteTest(CompletedTestDto completedTestDto, User user)     
        {
            CompletedTest test = new CompletedTest();
            test.Test = _context.Tests.Where(t => t.Id == completedTestDto.TestId).First();
            test.User = user;
            test.Date = DateTime.Now;
            test.Course = completedTestDto.CourseId == null ? null : _context.Courses.Where(c => c.Id == completedTestDto.CourseId).FirstOrDefault();
            test.Score = completedTestDto.Score;
            _context.CompletedTests.Add(test);
            _context.SaveChanges();
            return test;
        }

        public List<CompletedTest> FindCompletedTests(int? id, User user)
        {
            if(id != null)
            {
                return _context.CompletedTests.Where(t => t.Id == id).ToList();
            } else
            {
                return _context.CompletedTests.Where(t => t.User.Id == user.Id).ToList();
            }
        }
    }
}
