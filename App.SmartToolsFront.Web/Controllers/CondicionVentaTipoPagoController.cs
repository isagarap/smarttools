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
    public class CondicionVentaTipoPagoController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            MaestroCondicionVentaTipoPago m = new MaestroCondicionVentaTipoPago();
            List<CondicionVentaTipoPagoDTO> condVentas = m.GetAll();
            return Ok(condVentas);
        }

        [HttpGet]
        public IHttpActionResult Get(string id)
        {
            MaestroCondicionVentaTipoPago m = new MaestroCondicionVentaTipoPago();
            List<CondicionVentaTipoPagoDTO> condVentas = m.GetAllByCondVta(id);
            return Ok(condVentas);
        }
    }
}
