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
    public class TipoDespachoController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            MaestroTipoDespacho m = new MaestroTipoDespacho();
            List<TipoDespachoDTO> td = m.GetAll();
            return Ok(td);
        }
    }
}
