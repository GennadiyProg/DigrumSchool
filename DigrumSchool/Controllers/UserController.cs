using DigrumSchool.Config;
using DigrumSchool.Dto;
using DigrumSchool.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;

namespace DigrumSchool.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : Controller
    {
        private readonly SchoolContext _context;

        public UserController(SchoolContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public ActionResult<User> Register(UserDto userDto)
        {
            User localUser = new User();
            localUser.Username = userDto.UserName;
            localUser.Password = userDto.Password;
            Role role = _context.Roles.FirstOrDefault() ?? throw new ArgumentNullException();
            localUser.Role = role;
            _context.SaveChanges();
            HttpContext.Response.Cookies.Append("login", localUser.Username);
            return localUser;
        }

        [HttpPost("login")]
        public ActionResult<User> Login(UserDto userDto)
        {
            User? user = _context.Users.FirstOrDefault(user => user.Username.Equals(userDto.UserName) && user.Password.Equals(userDto.Password));
            
            if (user != null)
            {
                HttpContext.Response.Cookies.Append("login", user.Username);
                return user;
            }
            return Unauthorized();
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            HttpContext.Response.Cookies.Delete("login");
            return Ok();
        }
    }
}
