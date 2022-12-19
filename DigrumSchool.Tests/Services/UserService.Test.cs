using DigrumSchool.Config;
using DigrumSchool.Dto;
using DigrumSchool.Models;
using DigrumSchool.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DigrumSchool.Tests.Services
{
    public class UserServiceTest
    {
        private UserService userService;
        private SchoolContext context;

        public UserServiceTest()
        {
            var options = new DbContextOptionsBuilder<SchoolContext>()
                .UseInMemoryDatabase(databaseName: "DigrumSchool")
                .Options;
            context = new SchoolContext(options);
            userService = new UserService(context);
        }

        [Fact]
        public void RegisterReturnNullWhenUsernameAlreadyExist()
        {
            context.Roles.Add(new Role { Name = "User" });
            context.SaveChanges();
            UserDto userDto = new UserDto()
            {
                UserName = "user",
                Password = "pass"
            };

            User? firstUser = userService.Register(userDto);
            User? secondUser = userService.Register(userDto);

            Assert.NotNull(firstUser);
            Assert.Null(secondUser);
        }

        [Fact]
        public void LoginReturnNullWhenPasswordNotEquals()
        {
            context.Roles.Add(new Role { Name = "User" });
            context.SaveChanges();
            UserDto userDto = new UserDto()
            {
                UserName = "newUser",
                Password = "pass"
            };

            User? registerUser = userService.Register(userDto);
            Assert.NotNull(registerUser);

            User? loginUser = userService.Login(new UserDto()
            {
                UserName = registerUser.Username,
                Password = registerUser.Password + "1"
            });

            Assert.Null(loginUser);
        }
    }
}
