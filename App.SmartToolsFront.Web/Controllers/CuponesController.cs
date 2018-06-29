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
    public class CuponesController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            MaestroCupones m = new MaestroCupones();
            List<CuponesDTO> cupones = m.GetAll();
            return Ok(cupones);
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            MaestroCupones m = new MaestroCupones();
            CuponesDTO cupon = m.Get(id);
            return Ok(cupon);
        }

        [HttpGet]
        [Route("api/cupones/getCuponData/{Codigo}")]
        public IHttpActionResult GetClientByEmail([FromUri] string Codigo)
        {
            MaestroCupones m = new MaestroCupones();
            CuponesDTO cupon = m.Get(Codigo);
            return Ok(cupon);
        }

    }
}
