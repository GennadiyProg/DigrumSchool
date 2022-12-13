using DigrumSchool.Models;
using DigrumSchool.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DigrumSchool.Controllers
{
    [Route("course/")]
    [ApiController]
    public class CourseController : Controller
    {
        private readonly CourseService courseService;
        private readonly UserService userService;

        public CourseController(CourseService courseService, UserService userService)
        {
            this.courseService = courseService;
            this.userService = userService;
        }

        private User? CheckAuth()
        {
            string? userName = HttpContext.Request.Cookies["login"];
            User? currentUser = userService.FindUserByUsername(userName);
            return currentUser;
        }

        [HttpPost("create/{groupName}")]
        public ActionResult<Course> Create(string groupName)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            return courseService.Create(currentUser, groupName);
        }

        [HttpPost("addparticipant/{courseId}/{username}")]
        public ActionResult<Course> AddParticipant(int courseId, string username)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            Course? course = courseService.AddParticipant(courseId, username);
            if (course == null) return Ok("Course or test not found");
            return course;
        }

        [HttpPost("addtest/{courseId}/{testId}")]
        public ActionResult<Course> AddParticipant(int courseId, int testId)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            Course? course = courseService.AddTest(courseId, testId);
            if (course == null) return Ok("Course or test not found");
            return course;
        }

        [HttpGet("{courseId}")]
        public ActionResult<Course> FindById(int courseId)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            return courseService.FindById(courseId);
        }

        [HttpGet("creator/{username?}")]
        public ActionResult<List<Course>> FindAllByCreator(string? username)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            return courseService.FindAllByCreator(username == null ? currentUser.Username : username);
        }
    }
}
