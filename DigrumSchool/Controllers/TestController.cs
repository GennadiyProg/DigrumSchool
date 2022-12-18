using DigrumSchool.Config;
using DigrumSchool.Dto;
using DigrumSchool.Models;
using DigrumSchool.Models.Dto;
using DigrumSchool.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace DigrumSchool.Controllers
{
    [Route("test/")]
    [ApiController]
    public class TestController : Controller
    {
        private readonly TestService testService;
        private readonly UserService userService;

        public TestController(TestService testService, UserService userService)
        {
            this.testService = testService;
            this.userService = userService;
        }

        private User? CheckAuth()
        {
            string? userName = HttpContext.Request.Cookies["login"];
            User? currentUser = userService.FindUserByUsername(userName);
            return currentUser;
        }

        [HttpPost("create")]
        public ActionResult<Test> Create(TestDto testDto)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            return testService.Create(testDto, currentUser);
        }

        [HttpGet("creator/{username?}")]
        public ActionResult<List<Test>> FindAllByUser(string? username)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            username = username == null ? currentUser.Username : username;
            return testService.FindAllTestsByCreator(username);
        }

        [HttpGet("{id}")]
        public ActionResult<Test> FindTestById(int id)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            return testService.FindById(id);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteById(int id)
        {
            testService.DeleteById(id);
            return Ok();
        }

        [HttpPost("complete")]
        public ActionResult<CompletedTest> CompleteTest(CompletedTestDto completedTestDto)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            return testService.CompleteTest(completedTestDto, currentUser);
        }

        [HttpGet("completed/{id?}")]
        public ActionResult<List<CompletedTest>> FindCompletedTests(int? id)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            return testService.FindCompletedTests(id, currentUser);
        }

        [HttpGet("general/{category}")]
        public ActionResult<List<Test>> FindAllGeneralTests(string category)
        {
            return testService.FindAllGeneralTestsByCategory(category);
        }
    }
}
