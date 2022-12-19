using DigrumSchool.Config;
using DigrumSchool.Dto;
using DigrumSchool.Models;
using DigrumSchool.Models.Dto;
using DigrumSchool.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace DigrumSchool.Tests
{
    public class TestServiceTest
    {
        private TestService testService;
        private SchoolContext context;
        private User user;

        public TestServiceTest()
        {
            var options = new DbContextOptionsBuilder<SchoolContext>()
                .UseInMemoryDatabase(databaseName: "DigrumSchool")
                .Options;
            context = new SchoolContext(options);
            testService = new TestService(context);

            user = new User()
            {
                Username = "user",
                Password = "pass",
                Role = new Role() { Name = "User" }
            };
            context.Users.Add(user);
            context.SaveChanges();
        }

        [Fact]
        public void CreatedTestIsSavedWhenCreateTest()
        {
            TestDto test = new TestDto()
            {
                Title = "Test",
                Words = new List<WordDto>() { 
                    new WordDto()
                        {
                            Name = "red",
                            Translations = new List<string> { "красный" }
                        } 
                } ,
                IsGeneral = false
            };

            testService.Create(test, user);

            Assert.True(context.Tests.ToList().Any());
        }

        [Fact]
        public void UserIsSetAsCreatorWhenCreateTest()
        {
            TestDto test = new TestDto()
            {
                Title = "Test",
                Words = new List<WordDto>() {
                    new WordDto()
                        {
                            Name = "red",
                            Translations = new List<string> { "красный" }
                        }
                },
                IsGeneral = false
            };

            Test createdTest = testService.Create(test, user);

            Assert.NotNull(createdTest);
            Assert.NotNull(createdTest.Creator);
            Assert.Equal(createdTest.Creator.Username, user.Username);
        }

        [Fact]
        public void TestBecomeIsGeneralWhenUserIsAdmin()
        {
            TestDto test = new TestDto()
            {
                Title = "Test",
                Words = new List<WordDto>() {
                    new WordDto()
                        {
                            Name = "red",
                            Translations = new List<string> { "красный" }
                        }
                },
                IsGeneral = true
            };

            User admin = new User()
            {
                Username = "user",
                Password = "pass",
                Role = new Role() { Name = "Admin" }
            };

            Test testWithCommonUser = testService.Create(test, user);
            Test testWithAdmin = testService.Create(test, admin);

            Assert.NotNull(testWithCommonUser);
            Assert.NotNull(testWithAdmin);
            Assert.False(testWithCommonUser.IsGeneral);
            Assert.True(testWithAdmin.IsGeneral);
        }

        [Fact]
        public void TestIsCompleteWhenCompleteTest()
        {
            TestDto test = new TestDto()
            {
                Title = "Test",
                Words = new List<WordDto>() {
                    new WordDto()
                        {
                            Name = "red",
                            Translations = new List<string> { "красный" }
                        }
                },
                IsGeneral = true
            };
            Test createdTest = testService.Create(test, user);
            CompletedTest completedTest = testService.CompleteTest(new CompletedTestDto()
            {
                Score = 100,
                TestId = createdTest.Id
            }, user);

            Assert.NotNull(completedTest);
            Assert.NotNull(completedTest.Test);
            Assert.Equal(completedTest.Test.Id, createdTest.Id);
        }
    }
}
