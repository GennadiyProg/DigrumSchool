using DigrumSchool.Models;
using DigrumSchool.Models.Dto;
using DigrumSchool.Models.ViewModel;
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

        [HttpPost("create")]
        public ActionResult<Course> Create(CourseDto courseDto)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            return courseService.Create(currentUser, courseDto);
        }

        [HttpPost("update")]
        public ActionResult<Course> Update(CourseUpdateDto courseDto)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            Course? course = courseService.Update(courseDto);
            if (course == null) return Ok("Course or test not found");
            return course;
        }

        [HttpPost("addparticipant")]
        public ActionResult<Course> AddParticipants(CourseParticipantsDto courseParticipants)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            Course? course = courseService.AddParticipants(courseParticipants);
            if (course == null) return Ok("Course or test not found");
            return course;
        }

        [HttpPost("addtest")]
        public ActionResult<Course> AddTests(CourseTestsDto courseTests)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            Course? course = courseService.AddTests(courseTests);
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

        [HttpGet("completedtests/{courseId}/{userId?}")]
        public ActionResult<List<CompletedTest>> FindAllCompletedTestsByCourse(int courseId, int? userId)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            return courseService.FindAllCompletedTestsByCourse(courseId, userId == null ? currentUser.Id : userId);
        }

        [HttpPost("deleteparticipant/{courseId}/{userId}")]
        public IActionResult DeleteParticipant(int courseId, int UserId)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            courseService.DeleteParticipant(courseId, UserId);
            return Ok();
        }

        [HttpPost("deletetest/{courseId}/{testId}")]
        public IActionResult DeleteTest(int courseId, int testId)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            courseService.DeleteTest(courseId, testId);
            return Ok();
        }

        [HttpGet("leaderboard/{courseId}")]
        public ActionResult<List<StatInCourseVM>> GetLidearboard(int courseId)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            return courseService.GetLidearboard(courseId);
        }

        [HttpGet("participant/{participant?}")]
        public ActionResult<List<Course>> FindAllByParticipant(string? participant)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            return courseService.FindAllByParticipant(participant == null ? currentUser.Username : participant);
        }
    }
}
