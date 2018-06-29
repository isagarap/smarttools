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
    public class CondicionVentaController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            MaestroCondicionVenta m = new MaestroCondicionVenta();
            List<CondicionVentaDTO> condVentas = m.GetAll();
            return Ok(condVentas);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody] CondicionVentaDTO value)
        {
            if (ModelState.IsValid)
            {
                MaestroCondicionVenta mv = new MaestroCondicionVenta();
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
