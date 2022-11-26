using DigrumSchool.Config;
using DigrumSchool.Dto;
using DigrumSchool.Models;
using DigrumSchool.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
            if(_context.Users.Where(u => u.IsActive).FirstOrDefault() == null)
            {
                return Unauthorized();
            }
            return testService.Create(testDto);
        }
    }
}
