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
    public class ClienteController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get(string email)
        {
            MaestroClientes m = new MaestroClientes();
            ClienteDTO categorias = m.GetCliente(email);
            return Ok(categorias);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody] ClienteDTO value)
        {
            if (ModelState.IsValid)
            {
                value.Clave = HashCode(value.Clave);
                MaestroClientes mv = new MaestroClientes();
                ResponseInfo response = mv.Save(value);
                if (response.Success)
                {
                    return Ok(value);
                }
                return BadRequest(response.Message);
            }
            return BadRequest("Entrada Invalida");
        }

        [HttpPost]
        [Route("api/cliente/getClienteLogin")]
        public IHttpActionResult GetProducto([FromBody] LoginViewModel model)
        {
            LoginViewModel aux = new LoginViewModel();
            MaestroClientes m = new MaestroClientes();
            ClienteDTO client = m.GetCliente(model.Email);

            aux.Email = model.Email;
            aux.Clave = model.Clave;
            aux.Nombre = string.Empty;

            if (client != null && client.Email != null)
            {
                aux.Nombre = client.NomAux;
                if (client.Clave == HashCode(model.Clave))
                {
                    aux.Msg = "OK";
                }
                else { aux.Msg = "Contraseña no coincide"; }
            }
            else { aux.Msg = "Email no se encuentra registado"; }

            return Ok(aux);
        }

        [HttpPost]
        [Route("api/cliente/getClientByEmail")]
        public IHttpActionResult GetClientByEmail([FromBody] LoginViewModel model)
        {
            MaestroClientes m = new MaestroClientes();
            ClienteDTO client = m.GetCliente(model.Email);
            return Ok(client);
        }

        [HttpPost]
        [Route("api/cliente/getClientByRut")]
        public IHttpActionResult GetClientByRut([FromBody] LoginViewModel model)
        {
            MaestroClientes m = new MaestroClientes();
            ClienteDTO client = m.GetClienteByRut(model.Nombre);
            return Ok(client);
        }

        [HttpPost]
        [Route("api/cliente/getClientFromSoftland")]
        public IHttpActionResult GetClientFromSoftland([FromBody] LoginViewModel model)
        {
            MaestroClientes m = new MaestroClientes();
            List<ClienteSoftlandDTO> clients = m.GetClientFromSoftland(model.Nombre);
            return Ok(clients);
        }

        [HttpPost]
        [Route("api/cliente/updatePassword")]
        public IHttpActionResult UpdatePassword([FromBody] LoginViewModel model)
        {
            MaestroClientes m = new MaestroClientes();
            ResponseInfo response = m.UpdatePassword(HashCode(model.Clave), model.Email);
            if (response.Success)
            {
                return Ok(model);
            }
            else { BadRequest(); }
            return Ok(model);
        }

        public static string HashCode(string str)
        {
            string rethash = "";
            try
            {
                System.Security.Cryptography.SHA1 hash = System.Security.Cryptography.SHA1.Create();
                System.Text.ASCIIEncoding encoder = new System.Text.ASCIIEncoding();
                byte[] combined = encoder.GetBytes(str);
                hash.ComputeHash(combined);
                rethash = Convert.ToBase64String(hash.Hash);
            }
            catch (Exception ex)
            {
                string strerr = "Error in HashCode : " + ex.Message;
            }
            return rethash;
        }

        [HttpPost]
        [Route("api/cliente/getClienteComprasFromSoftland")]
        public IHttpActionResult GetClienteComprasFromSoftland([FromBody] LoginViewModel model)
        {
            MaestroMetodosSoftland m = new MaestroMetodosSoftland();
            List<ComprasClienteDTO> clients = m.GetClientesComprasSoftland(model.Nombre);
            return Ok(clients);
        }

        [HttpPost]
        [Route("api/cliente/getClienteEstadoComprasFromSoftland")]
        public IHttpActionResult GetClienteEstadoComprasFromSoftland([FromBody] LoginViewModel model)
        {
            MaestroMetodosSoftland m = new MaestroMetodosSoftland();
            List<ClienteSaldosDTO> clients = m.GetClienteEstadoComprasFromSoftland(model.Nombre);
            return Ok(clients);
        }

        [HttpPost]
        [Route("api/cliente/getTemporalPasswordToUpdate")]
        public IHttpActionResult GetTemporalPasswordToUpdate([FromBody] LoginViewModel model)
        {
            if (model.Email != null && model.Email != "")
            {
                MaestroClientes m = new MaestroClientes();
                ClienteDTO cliente = m.GetClienteByRut(model.Msg);

                DateTime dt = DateTime.Now;

                string newPass = cliente.CodAux.ToString() + dt.Year.ToString() +
                                 dt.Month.ToString() + dt.Day.ToString() + dt.Minute.ToString();

                cliente.Clave = HashCode(newPass);
                m.UpdatePassword(cliente.Clave, model.Email);

                model.Clave = newPass;
            }

            return Ok(model);
        }

    }
}
