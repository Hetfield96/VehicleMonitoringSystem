using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMS_Web.Data.DatabaseModels
{
    [Table("company_settings")]
    public class CompanySettings
    {
        [Key]
        [Column("company_id")] 
        public int CompanyId { get; set; }
        
        [ForeignKey("CompanyId")]
        public Company Company { get; set; }
        
        [Column("android_interval_recording")]
        public int AndroidIntervalRecording { get; set; }
        
        [Column("android_interval_synchronization")]
        public int AndroidIntervalSynchronization { get; set; }
    }
}