using HospitalApp.Dal.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace HospitalApp.Services.Interfaces
{
    public interface IHospitalService
    {
        IList<Hospital> GetAll();
        Hospital Find(int id);
        bool Delete(int id);
        bool CreateOrEdit(Hospital hospital);
    }
}
