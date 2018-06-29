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
    public class CategoriasController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            MaestroCategorias m = new MaestroCategorias();
            List<CategoriasDTO> categorias = m.GetAll();
            return Ok(categorias);
        }

        [HttpGet]
        [Route("api/categorias/getAllForMenu")]
        public IHttpActionResult GetAllForMenu()
        {
            MaestroCategorias m = new MaestroCategorias();
            List<CategoriasDTO> categorias = m.GetAllForMenu();
            return Ok(categorias);
        }

    }
}
