using DigrumSchool.Config;
using DigrumSchool.Dto;
using DigrumSchool.Models;
using DigrumSchool.Services;
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
        private readonly UserService userService;

        public UserController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("register")]
        public ActionResult<User> Register(UserDto userDto)
        {
            User? localUser = userService.Register(userDto);
            if(localUser == null)
            {
                return Unauthorized("User with such username already exists");
            }
            HttpContext.Response.Cookies.Append("login", localUser.Username);
            return localUser;
        }

        [HttpPost("login")]
        public ActionResult<User> Login(UserDto userDto)
        {
            User? user = userService.Login(userDto);
            
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
        private User? CheckAuth()
        {
            string? userName = HttpContext.Request.Cookies["login"];
            User? currentUser = userService.FindUserByUsername(userName);
            return currentUser;
        }

        [HttpGet("username")]
        public ActionResult<User> FindByUsername(string username)
        {
            User? currentUser = CheckAuth();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            User? user = userService.FindUserByUsername(username);
            if (user == null) return Ok("User not found");
            return user;
        }
    }
}
