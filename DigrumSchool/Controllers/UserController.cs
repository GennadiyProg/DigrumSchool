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
        public ActionResult<User> Index(UserDto userDto)
        {
            User localUser = new User();
            localUser.Username = userDto.UserName;
            localUser.Password = userDto.Password;
            localUser.IsActive = true;
            Role role = _context.Roles.FirstOrDefault();
            localUser.Role = role;
            _context.Users.Add(localUser);
            _context.SaveChanges();
            return localUser;
        }

        [HttpPost("login")]
        public ActionResult<User> Login(UserDto userDto)
        {
            User? user = _context.Users.FirstOrDefault(user => user.Username.Equals(userDto.UserName) && user.Password.Equals(userDto.Password));
            if (user != null)
            {
                user.IsActive = true;
                _context.SaveChanges();
                return user;
            }
            return Unauthorized();
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            List<User> users = _context.Users.Where(user => user.IsActive == true).ToList();
            users.ForEach(user => user.IsActive = false);
            _context.SaveChanges();
            return Ok();
        }
    }
}
