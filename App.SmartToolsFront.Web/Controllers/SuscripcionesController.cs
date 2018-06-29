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
    public class SuscripcionesController : ApiController
    {
        [HttpPost]
        public IHttpActionResult Post([FromBody] SuscripcionesDTO value)
        {
            if (ModelState.IsValid)
            {
                MaestroSuscripciones mv = new MaestroSuscripciones();
                ResponseInfo response = mv.Save(value);
                if (response.Success)
                {
                    return Ok(value);
                }
                return BadRequest(response.Message);
            }
            return BadRequest("Entrada Invalida");
        }
    }
}
