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
        private readonly SchoolContext _context;
        private readonly TestService testService;

        public TestController(SchoolContext schoolContext, TestService testService)
        {
            _context = schoolContext;
            this.testService = testService;
        }

        [HttpPost("create")]
        public ActionResult<Test> Create(TestDto testDto)
        {
            string? userName = HttpContext.Request.Cookies["login"];
            User? currentUser = _context.Users.Where(u => u.Username == userName).FirstOrDefault();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            return testService.Create(testDto, currentUser);
        }

        [HttpGet("creator/{username?}")]
        public ActionResult<List<Test>> FindAllByUser(string? username)
        {
            string? currentUserName = HttpContext.Request.Cookies["login"];
            User? currentUser = _context.Users.Where(u => u.Username == currentUserName).FirstOrDefault();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            username = username == null ? currentUserName : username;
            return testService.FindAllTestsByCreator(username);
        }

        [HttpGet("{id}")]
        public ActionResult<Test> FindTestById(int id)
        {
            string? currentUserName = HttpContext.Request.Cookies["login"];
            User? currentUser = _context.Users.Where(u => u.Username == currentUserName).FirstOrDefault();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            return testService.FindById(id);
        }

        [HttpPost("complete")]
        public ActionResult<CompletedTest> CompleteTest(CompletedTestDto completedTestDto)
        {
            string? currentUserName = HttpContext.Request.Cookies["login"];
            User? currentUser = _context.Users.Where(u => u.Username == currentUserName).FirstOrDefault();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            return testService.CompleteTest(completedTestDto, currentUser);
        }

        [HttpGet("completed/{id?}")]
        public ActionResult<List<CompletedTest>> FindCompletedTests(int? id)
        {
            string? currentUserName = HttpContext.Request.Cookies["login"];
            User? currentUser = _context.Users.Where(u => u.Username == currentUserName).FirstOrDefault();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            return testService.FindCompletedTests(id, currentUser);
        }
    }
}
