using DigrumSchool.Config;
using DigrumSchool.Dto;
using DigrumSchool.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DigrumSchool.Services
{
    public class UserService
    {
        private readonly SchoolContext _context;

        public UserService(SchoolContext context)
        {
            _context = context;
        }

        public User Register(UserDto userDto)
        {
            User localUser = new User();
            localUser.Username = userDto.UserName;
            localUser.Password = userDto.Password;
            Role role = _context.Roles.FirstOrDefault() ?? throw new ArgumentNullException();
            localUser.Role = role;
            _context.Users.Add(localUser);
            _context.SaveChanges();
            return FindUserByUsername(localUser.Username) ?? throw new ArgumentNullException();
        }

        public User? Login(UserDto userDto)
        {
            Expression<Func<User, bool>> expression = user => user.Username.Equals(userDto.UserName) && user.Password.Equals(userDto.Password);
            return FindUserByExpression(expression);
        }

        public User? FindUserByUsername(string? username)
        {
            Expression<Func<User, bool>> expression = u => u.Username == username;
            return FindUserByExpression(expression);
        }

        private User? FindUserByExpression(Expression<Func<User, bool>> expression)
        {
            return _context.Users
                .Where(expression)
                .Include(u => u.Courses)
                .Include(u => u.CreatedCourses)
                .Include(u => u.Languages)
                .Include(u => u.Role)
                .FirstOrDefault();
        }
    }
}
