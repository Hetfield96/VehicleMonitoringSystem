﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VMS_Backend.Data.Models;
using VMS_Backend.DatabaseServices;

namespace VMS_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
    }
}