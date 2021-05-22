﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VMS_Backend.Services.Utils;

namespace VMS_Backend.Data.DatabaseModels
{
    [Table("work_task_comment")]
    public class WorkTaskComment
    {
        public WorkTaskComment(int companyId, string authorId, int taskId, string text, string attachmentName)
        {
            Date = DateTime.Now;
            CompanyId = companyId;
            AuthorId = authorId;
            Text = text;
            TaskId = taskId;
            AttachmentName = attachmentName;
            if (!string.IsNullOrEmpty(attachmentName))
            {
                Type = FileSaver.IsImage(attachmentName) ? "photo" : "file";
            }
        }
        
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Column("company_id")] 
        public int CompanyId { get; set; }
        [ForeignKey("CompanyId")]
        public Company Company { get; set; }       
        
        [Column("author_id")]
        public string AuthorId { get; set; }
        [ForeignKey("AuthorId")]
        public Employee Author { get; set; }
        
        [Column("text")]
        [MaxLength(5000)]
        public string Text { get; set; }
        
        [Column("date")] 
        public DateTime Date { get; set; }
        
        [Column("task_id")] 
        public int TaskId { get; set; }
        [ForeignKey("TaskId")]
        public WorkTask Task { get; set; }
        
        // text, file, photo
        [Column("type")]
        [MaxLength(10)]
        public string Type { get; set; }
        
        [Column("attachment_name")]
        [MaxLength(60)]
        public string AttachmentName { get; set; }
    }
}