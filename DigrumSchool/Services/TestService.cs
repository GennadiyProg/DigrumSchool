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
            test.Creator = _context.Users.Where(u => u.IsActive).FirstOrDefault();
            _context.Tests.Add(test);
            _context.SaveChanges();
            return test;
        }
    }
}
