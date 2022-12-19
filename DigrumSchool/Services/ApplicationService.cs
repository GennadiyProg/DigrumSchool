using DigrumSchool.Config;
using DigrumSchool.Models;
using Microsoft.EntityFrameworkCore;

namespace DigrumSchool.Services
{
    public class ApplicationService
    {
        private readonly SchoolContext _context;
        private readonly TestService testService;

        public ApplicationService(SchoolContext context, TestService testService)
        {
            _context = context;
            this.testService = testService;
        }

        public void Create(int testId)
        {
            if (_context.Applications.Where(a => a.Test.Id == testId).Any())
            {
                return;
            }
            Application application = new Application()
            {
                Test = _context.Tests.Where(t => t.Id == testId).First(),
                Status = ApplicationStatus.CREATED
            };
            _context.Applications.Add(application);
            _context.SaveChanges();
        }

        public List<Test> FindAllCreated()
        {
            List<int> testsId = _context.Applications.Where(a => a.Status == ApplicationStatus.CREATED).Select(a => a.Test.Id).ToList();
            return testService.FindTestListByExpretion(t => testsId.Contains(t.Id));
        }

        public List<Test> FindAllApproved()
        {
            List<int> testsId = _context.Applications.Where(a => a.Status == ApplicationStatus.APPROVED).Select(a => a.Test.Id).ToList();
            return testService.FindTestListByExpretion(t => testsId.Contains(t.Id));
        }

        public void Approve(int testId)
        {
            Application application = _context.Applications.Where(a => a.Test.Id == testId).First();
            if (application.Status == ApplicationStatus.CREATED)
            {
                application.Status = ApplicationStatus.APPROVED;
            }
            _context.SaveChanges();
        }

        public void Process(int testId)
        {
            Application application = _context.Applications.Where(a => a.Test.Id == testId).Include(a => a.Test).First();
            if (application.Status == ApplicationStatus.APPROVED)
            {
                application.Status = ApplicationStatus.PROCESSED;
                application.Test.IsGeneral = true;
            }
            _context.SaveChanges();
        }

        public void Reject(int testId)
        {
            Application application = _context.Applications.Where(a => a.Test.Id == testId).First();
            application.Status = ApplicationStatus.REJECTED;
            _context.SaveChanges();
        }
    }
}
