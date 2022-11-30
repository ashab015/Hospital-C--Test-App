using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HospitalApp.Dal.Models;
using HospitalApp.Services;
using HospitalApp.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HospitalApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalsController : ControllerBase
    {
        public IHospitalService _hospitalService;

        public HospitalsController(IHospitalService hospitalService)
        {
            _hospitalService = hospitalService;
        }

        [Route("all"), HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var hospitals = _hospitalService.GetAll();
                return Ok(hospitals);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        [Route("find"), HttpGet]
        public IActionResult Get([FromQuery]int id)
        {
            try
            {
                if (id < 0)
                {
                    return BadRequest();
                }

                var hospital = _hospitalService.Find(id);
                return Ok(hospital);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        [Route("delete"), HttpDelete]
        public IActionResult Delete([FromQuery] int id)
        {
            try
            {
                if (id < 0)
                {
                    return BadRequest();
                }

                var result = _hospitalService.Delete(id);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        [Route("create"), HttpPost]
        public IActionResult Create([FromForm] Hospital hospital)
        {
            try
            {
                var result = _hospitalService.CreateOrEdit(hospital);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}
