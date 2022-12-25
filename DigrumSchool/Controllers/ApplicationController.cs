using DigrumSchool.Models;
using DigrumSchool.Services;
using Microsoft.AspNetCore.Mvc;

namespace DigrumSchool.Controllers
{
    [Route("application/")]
    [ApiController]
    public class ApplicationController : Controller
    {
        private readonly UserService userService;
        private readonly ApplicationService applicationService;

        public ApplicationController(UserService userService, ApplicationService applicationService)
        {
            this.userService = userService;
            this.applicationService = applicationService;
        }

        private User? CheckAuth()
        {
            string? userName = HttpContext.Request.Cookies["login"];
            User? currentUser = userService.FindUserByUsername(userName);
            return currentUser;
        }

        [HttpPost("create/{testId}")]
        public IActionResult Create(int testId)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            applicationService.Create(testId);
            return Ok();
        }

        [HttpPost("process/{testId}")]
        public IActionResult Approve(int testId)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            if (currentUser.Role.Name == "Teacher")
            {
                applicationService.Approve(testId);
            } else if (currentUser.Role.Name == "Admin")
            {
                applicationService.Process(testId);
            }
            return Ok();
        }

        [HttpPost("reject/{testId}")]
        public IActionResult Reject(int testId)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            if (currentUser.Role.Name == "Teacher" || currentUser.Role.Name == "Admin")
            {
                applicationService.Reject(testId);
            }
            return Ok();
        }

        [HttpGet("created")]
        public ActionResult<List<Test>> FindAllCreated()
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            if (currentUser.Role.Name == "Teacher" || currentUser.Role.Name == "Admin")
            {
                return applicationService.FindAllCreated();
            }
            return new List<Test>();
        }

        [HttpGet("approved")]
        public ActionResult<List<Test>> FindAllApproved()
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            if (currentUser.Role.Name == "Admin")
            {
                return applicationService.FindAllApproved();
            }
            return new List<Test>();
        }
    }
}
