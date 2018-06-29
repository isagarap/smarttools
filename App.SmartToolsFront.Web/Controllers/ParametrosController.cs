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
    public class ParametrosController : ApiController
    {

        [HttpGet]
        [Route("api/parametros/getByNombre/{nombre}")]
        public IHttpActionResult GetByNombre([FromUri] string nombre)
        {
            MaestroParametros m = new MaestroParametros();
            ParametrosDTO p = m.GetParametro(nombre);
            return Ok(p);
        }

    }
}
