using HospitalApp.Dal;
using HospitalApp.Dal.Models;
using HospitalApp.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HospitalApp.Services
{
    public class HospitalService : IHospitalService
    {
        public HospitalDbContext _hospitalDbContext;

        public HospitalService(HospitalDbContext hospitalDbContext)
        {
            _hospitalDbContext = hospitalDbContext;
        }

        public IList<Hospital> GetAll()
        {
            return _hospitalDbContext.Hospitals.ToList();
        }

        public Hospital Find(int id)
        {
            var hospital = _hospitalDbContext.Hospitals.FirstOrDefault(x => x.Id == id);
            return hospital;
        }

        public bool Delete(int id)
        {
            var hospital = _hospitalDbContext.Hospitals.FirstOrDefault(x => x.Id == id);
            _hospitalDbContext.Hospitals.Remove(hospital);
            var rows = _hospitalDbContext.SaveChanges();
            return rows > 0;
        }

        public bool CreateOrEdit(Hospital hospital)
        {
            if (hospital.Id < 0)
            {
                hospital.Id = 0;
                _hospitalDbContext.Hospitals.Add(hospital);
            }
            else
            {
                var existingHospital = _hospitalDbContext.Hospitals.FirstOrDefault(x => x.Id == hospital.Id);
                existingHospital.Name = hospital.Name;
                existingHospital.Address = hospital.Address;
                existingHospital.ManagerName = hospital.ManagerName;
                existingHospital.HealthcareIndustryNumber = hospital.HealthcareIndustryNumber;
                existingHospital.HospitalCode = hospital.HospitalCode;
            }

            var rows = _hospitalDbContext.SaveChanges();
            return rows > 0;
        }
    }
}
