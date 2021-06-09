using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Web.Data.DatabaseModels;
using VMS_Web.Services.Database;

namespace VMS_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly RoleService _roleService;

        public RoleController(RoleService roleService)
        {
            _roleService = roleService;
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Role role)
        {
            await _roleService.AddNewItem(role);
            return Ok();
        }
        
        [HttpGet]
        [Route("getAll")]
        public List<Role> GetAll()
        {
            return _roleService.GetAll();
        }
    }
}