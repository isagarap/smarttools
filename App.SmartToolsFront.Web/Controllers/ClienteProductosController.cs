using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using App.SmartToolsFront.DAL;
using App.SmartToolsFront.DTO;
using App.SmartToolsFront.Web.ViewModels;

namespace App.SmartToolsFront.Web.Controllers
{
    public class ClienteProductosController : ApiController
    {
        // GET: api/Perfil/5
        public IHttpActionResult Get()
        {
            ClienteProductos m = new ClienteProductos();
            IEnumerable<ProductosDTO> aux = m.GetAllByClient("");
            return Ok();
        }

        public IHttpActionResult Get(int id)
        {
            ClienteProductos m = new ClienteProductos();
            IEnumerable<ProductosDTO> aux = m.GetAllByClient("");
            return Ok();
        }

        // POST: api/Perfil
        [HttpPost]
        public IHttpActionResult Post([FromBody] ClienteProductosDTO value)
        {
            if (value.Id == 0 && ModelState.IsValid)
            {
                ClienteProductos m = new ClienteProductos();
                ResponseInfo response = m.Save(value);
                if (response.Success)
                {
                    return Ok(value);
                }
                return BadRequest(response.Message);
            }
            return BadRequest("Entrada Invalida");
        }

        [HttpDelete]
        public IHttpActionResult Delete(string email, string codProd)
        {
            if (email.Length > 0)
            {
                ClienteProductos m = new ClienteProductos();
                ResponseInfo response = m.Delete(email, codProd);
                if (response.Success)
                    return Ok();
                else
                    return BadRequest(response.Message);
            }
            return BadRequest("Entrada Invalida");
        }

        [HttpPost]
        [Route("api/clienteproductos/getProductos")]
        public IHttpActionResult GetProductos([FromBody] LoginViewModel model)
        {
            if (model.Email.Length > 0)
            {
                ClienteProductos m = new ClienteProductos();
                IEnumerable<ProductosDTO> aux = m.GetAllByClient(model.Email);
                return Ok(aux);
            }
            return BadRequest("Entrada Invalida");
        }

    }
}
