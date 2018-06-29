using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using App.SmartToolsFront.DTO;
using App.SmartToolsFront.DAL;
using App.SmartToolsFront.Web.ViewModels;

namespace App.SmartToolsFront.Web.Controllers
{
    public class VentaController : ApiController
    {
        public IHttpActionResult Get()
        {
            MaestroVentas mv = new MaestroVentas();
            List<VentaDTO> aux = mv.GetAllVentas();
            return Ok(aux);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody] VentaDTO value)
        {
            if (value.IdVenta == 0 && ModelState.IsValid)
            {
                MaestroVentas mv = new MaestroVentas();
                double response = mv.Save(value);
                if (response != -1)
                {
                    VentaViewModel vm = new VentaViewModel();
                    vm.IdVenta = Convert.ToInt32(response);
                    return Ok(vm);
                }
                return BadRequest("Entrada Invalida");
            }
            return BadRequest("Entrada Invalida");
        }

        [HttpGet]
        [Route("api/venta/generaNotaVenta/{IdVenta:int}")]
        public IHttpActionResult GeneraNotaVenta([FromUri] int IdVenta)
        {
            Helpers.CreaNotaVenta nv = new Helpers.CreaNotaVenta();
            double response  = nv.CreaNotaVentaSofltand(IdVenta);
            if (response > 0)
            {
                VentaDTO vta = new VentaDTO();
                vta.EstadoSoft = response.ToString();
                return Ok(vta);
            }
            else { return BadRequest(); }
        }
    }
}
