using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HospitalApp.Dal.Models
{
    public class Hospital
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string ManagerName { get; set; }
        public string HospitalCode { get; set; }
        public string HealthcareIndustryNumber { get; set; }
    }
}
