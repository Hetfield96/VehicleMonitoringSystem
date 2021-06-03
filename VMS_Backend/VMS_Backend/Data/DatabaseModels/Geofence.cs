using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMS_Backend.Data.DatabaseModels
{
    [Table("geofence")]
    public class Geofence
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Column("name")]
        [MaxLength(50)]
        public string Name { get; set; }
        
        [Column("company_id")] 
        public int CompanyId { get; set; }
        [ForeignKey("CompanyId")]
        public Company Company { get; set; } 
        
        [Column("coords")]
        public string Coords { get; set; }
        
        [Column("is_leave_restricted")]
        public bool IsLeaveRestricted { get; set; }
        
        [Column("is_enter_restricted")]
        public bool IsEnterRestricted { get; set; }
    }
}