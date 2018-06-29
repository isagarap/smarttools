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
    public class RegistroLumioController : ApiController
    {
        [HttpPost]
        public IHttpActionResult Post([FromBody] RegistroLumioDTO model)
        {
            MaestroLumio m = new MaestroLumio();
            ResponseInfo response = m.Save(model);
            if (response.Success)
                return Ok(model);
            else
                return BadRequest();
        }
    }
}
