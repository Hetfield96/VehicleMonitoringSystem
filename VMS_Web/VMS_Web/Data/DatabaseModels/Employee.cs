﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMS_Web.Data.DatabaseModels
{
    [Table("employee")]
    public class Employee
    {
        [Key]
        [Column("id")]
        public string Id { get; set; }

        [Column("role_id")] 
        public short RoleId { get; set; }
        [ForeignKey("RoleId")]
        public Role Role { get; set; }
        
        [Column("company_id")] 
        public int CompanyId { get; set; }
        [ForeignKey("CompanyId")]
        public Company Company { get; set; }       
        
        [Column("first_name")]
        [MaxLength(40)]
        public string FirstName { get; set; }
        
        [Column("last_name")]
        [MaxLength(40)]
        public string LastName { get; set; }
        
        [Column("email")]
        [MaxLength(40)]
        public string Email { get; set; }
    }
}