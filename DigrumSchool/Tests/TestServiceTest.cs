using DigrumSchool.Config;
using DigrumSchool.Dto;
using DigrumSchool.Models;
using DigrumSchool.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace DigrumSchool.Tests
{
    public class TestDbContext
    {
        public TestDbContext()
        {
            var serviceCollection = new ServiceCollection();
            serviceCollection
                .AddDbContext<SchoolContext>(opt =>
                    opt.UseNpgsql("Server=localhost;Port=5432;Database=DigrumSchool;UserId=postgres;Password=postgres"));
            serviceCollection.AddScoped<TestService>();

            ServiceProvider = serviceCollection.BuildServiceProvider();
        }

        public ServiceProvider ServiceProvider { get; private set; }
    }

    public class TestServiceTest : IClassFixture<TestDbContext>
    {
        private ServiceProvider _serviceProvider;
        private TestService testService;

        public TestServiceTest(TestDbContext fixture)
        {
            _serviceProvider = fixture.ServiceProvider;
            testService = _serviceProvider.GetService<TestService>();
        }

        [Fact]
        public void UserIsSetAsCreatorWhenCreateTest()
        {
            List<Test> data = new List<Test>();

            //var contextMock = new Mock<SchoolContext>();
            //contextMock.Setup(context => context.Tests.Add(It.IsAny<Test>())).Callback<Test>(data.Add);
            //contextMock.Setup(context => context.Languages.FirstOrDefault()).Returns(new Language());
            //contextMock.Setup(context => context.Categories.FirstOrDefault()).Returns(new Category());

            User user = new User()
            {
                Role = new Role() { Name = "User" }
            };
            TestDto test = new TestDto();

            testService.Create(test, user);

            Assert.True(data.Any());
        }
    }
}
