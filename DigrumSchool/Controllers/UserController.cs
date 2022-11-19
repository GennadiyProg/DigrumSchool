using DigrumSchool.Dto;
using DigrumSchool.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DigrumSchool.Controllers
{
    [ApiController]
    [Route("user")]
    [Authorize]
    public class UserController : Controller
    {
        public static User localUser;

        [HttpPost("register"), AllowAnonymous]
        public ActionResult<User> Index(UserDto userDto)
        {
            localUser = new User();
            localUser.Login = userDto.UserName;
            localUser.Password = userDto.Password;
            return localUser;
        }

        [HttpPost("login"), AllowAnonymous]
        public ActionResult<string> Login(UserDto userDto)
        {
            if (userDto.UserName.Equals(localUser.Login))
            {
                List<Claim> claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, localUser.Login),
                    new Claim(ClaimTypes.Role, "teacher")
                };
                return localUser.Login;
            }
            return Unauthorized();
        }
    }
}
