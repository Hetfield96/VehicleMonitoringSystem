using System.Threading.Tasks;
using VMS_Web.Data;
using VMS_Web.Data.DatabaseModels;

namespace VMS_Web.Services.Database
{
    public class CompanyService : BaseDatabaseService<Company>
    {
        public CompanyService(ApplicationDbContext dbContext) : base(dbContext) { }

        public override async Task<Company> AddNewItem(Company item)
        {
            return await base.AddNewItem(item);
        }
    }
}