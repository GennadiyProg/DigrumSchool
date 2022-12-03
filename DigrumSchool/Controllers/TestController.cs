using DigrumSchool.Config;
using DigrumSchool.Dto;
using DigrumSchool.Models;
using DigrumSchool.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace DigrumSchool.Controllers
{
    [Route("test")]
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
    }
}
