using DigrumSchool.Config;
using DigrumSchool.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<SchoolContext>(opt =>
opt.UseNpgsql("Server=localhost;Port=5432;Database=DigrumSchool;UserId=postgres;Password=postgres"));
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<TestService>();
builder.Services.AddScoped<CourseService>();
builder.Services.AddScoped<ApplicationService>();
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (!app.Environment.IsDevelopment())
//{
//    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//    app.UseHsts();
//}

//app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.UseAuthentication();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
