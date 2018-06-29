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
    public class UbicacionController : ApiController
    {
        [HttpGet]
        [Route("api/ubicacion/getRegiones")]
        public IHttpActionResult GetRegiones()
        {
            MaestroUbicacion m = new MaestroUbicacion();
            List<RegionDTO> productos = m.GetAllRegiones();
            return Ok(productos);
        }

        [HttpGet]
        [Route("api/ubicacion/getCiudades")]
        public IHttpActionResult GetCiudades()
        {
            MaestroUbicacion m = new MaestroUbicacion();
            List<CiudadDTO> productos = m.GetAllCiudades();
            return Ok(productos);
        }

        [HttpGet]
        [Route("api/ubicacion/getComunas")]
        public IHttpActionResult GetComunas()
        {
            MaestroUbicacion m = new MaestroUbicacion();
            List<ComunaDTO> productos = m.GetAllComunas();
            return Ok(productos);
        }

        [HttpPost]
        [Route("api/ubicacion/getUbicacion")]
        public IHttpActionResult GetUbicacion([FromBody] LoginViewModel vm)
        {
            MaestroUbicacion m = new MaestroUbicacion();
            UbicacionDTO u = m.GetUbicacion(vm.Email);
            return Ok(u);
        }
    }
}
