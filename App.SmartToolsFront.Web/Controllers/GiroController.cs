using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using App.SmartToolsFront.DTO;
using App.SmartToolsFront.DAL;

namespace App.SmartToolsFront.Web.Controllers
{
    public class GiroController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            MaestroGiros m = new MaestroGiros();
            List<GiroDTO> giros = m.GetAll();
            return Ok(giros);
        }
    }
}
