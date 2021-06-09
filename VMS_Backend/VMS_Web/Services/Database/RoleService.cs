using System.Threading.Tasks;
using VMS_Web.Data;
using VMS_Web.Data.DatabaseModels;

namespace VMS_Web.Services.Database
{
    public class RoleService : BaseDatabaseService<Role>
    {
        public RoleService(ApplicationDbContext dbContext) : base(dbContext) { }

        public override async Task<Role> AddNewItem(Role item)
        {
            return await base.AddNewItem(item);
        }
    }
}