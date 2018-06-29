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
    public class ProductosController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            MaestroProductos m = new MaestroProductos();
            List<ProductosDTO> productos = m.GetAll();
            return Ok(productos);
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            MaestroProductos m = new MaestroProductos();
            ProductosDTO productos = m.GetProducto(id);
            return Ok(productos);
        }

        [HttpPost]
        [Route("api/productos/getAllOneImage")]
        public IHttpActionResult GetAllOneImage([FromBody] LoginViewModel user)
        {
            bool userLogued = (!String.IsNullOrEmpty(user.Email)) ? true : false;
            string codLista = string.Empty;

            if(userLogued)
            {
                MaestroClientes mc = new MaestroClientes();
                ClienteDTO cl = mc.GetCliente(user.Email);
                codLista = cl.CodLista;
            }
            else
            {
                MaestroParametros mp = new MaestroParametros();
                ParametrosDTO param = mp.GetParametro("ListaPreciosDefecto");
                codLista = param.Valor;
            }

            MaestroProductos m = new MaestroProductos();
            List<ProductosDTO> productos = m.GetAllOneImage(codLista);
            return Ok(productos);
        }

        [HttpGet]
        [Route("api/productos/getProductoByCodigo/{CodProducto}")]
        public IHttpActionResult GetProductoByCodigo([FromUri] string CodProducto)
        {
            if (CodProducto.Length > 0)
            {
                MaestroProductos m = new MaestroProductos();
                ProductosDTO productos = m.GetProductoByCodigo(CodProducto);
                return Ok(productos);
            }
            return BadRequest("Entrada Invalida");
        }

        [HttpGet]
        [Route("api/productos/getProducto/{CodProducto}")]
        public IHttpActionResult GetProducto([FromUri] string CodProducto)
        {
            if (CodProducto.Length > 0)
            {
                MaestroProductos m = new MaestroProductos();
                List<ProductosDTO> productos = m.GetProductoAsList(CodProducto);
                return Ok(productos);
            }
            return BadRequest("Entrada Invalida");
        }

        [HttpGet]
        [Route("api/productos/getImagesFromProduct/{CodProducto}")]
        public IHttpActionResult GetImagesFromProduct([FromUri] string CodProducto)
        {
            if (CodProducto.Length > 0)
            {
                MaestroProductos m = new MaestroProductos();
                List<ProductosImagenes> imgProductos = m.GetImagesFromProduct(CodProducto);
                return Ok(imgProductos);
            }
            return BadRequest("Entrada Invalida");
        }

        [HttpPost]
        [Route("api/productos/getProductsFromSearchWithFilter")]
        public IHttpActionResult GetProductsFromSearchWithFilter([FromBody] FIlterViewModel model)
        {
            if (model.filterValue.Length > 0)
            {
                bool userLogued = (!String.IsNullOrEmpty(model.Email)) ? true : false;
                string codLista = string.Empty;

                if (userLogued)
                {
                    MaestroClientes mc = new MaestroClientes();
                    ClienteDTO cl = mc.GetCliente(model.Email);
                    codLista = cl.CodLista;
                }
                else
                {
                    MaestroParametros mp = new MaestroParametros();
                    ParametrosDTO param = mp.GetParametro("ListaPreciosDefecto");
                    codLista = param.Valor;
                }

                MaestroProductos m = new MaestroProductos();

                if(model.filterValue == "categoriasAllSearch")
                    model.filterValue = string.Empty;

                string filters = string.Empty;
                foreach(CategoriasDTO row in model.Categorias)
                {
                    if (String.IsNullOrEmpty(filters))
                        filters = "'" + row.CodGrupo + "'";
                    else
                        filters = filters + ", " + "'" + row.CodGrupo + "'";
                }

                List<ProductosDTO> aux = m.GetAllOneImageSearchWithFilter(model.filterValue, filters, codLista);

                if (model.OrderBy == 2)
                    aux = aux.OrderBy(pet => pet.PrecioVta).ToList();
                else if (model.OrderBy == 3)
                    aux = aux.OrderByDescending(x => x.PrecioVta).ToList();

                return Ok(aux);
            }
            return BadRequest("Entrada Invalida");
        }

        [HttpPost]
        [Route("api/productos/getProductoForDetalleByCodigo")]
        public IHttpActionResult GetProductoForDetalleByCodigo([FromBody] LoginViewModel vm)
        {
            if (vm.Nombre.Length > 0)
            {
                bool userLogued = (!String.IsNullOrEmpty(vm.Email)) ? true : false;
                string codLista = string.Empty;

                if (userLogued)
                {
                    MaestroClientes mc = new MaestroClientes();
                    ClienteDTO cl = mc.GetCliente(vm.Email);
                    codLista = cl.CodLista;
                }
                else
                {
                    MaestroParametros mp = new MaestroParametros();
                    ParametrosDTO param = mp.GetParametro("ListaPreciosDefecto");
                    codLista = param.Valor;
                }

                MaestroProductos m = new MaestroProductos();
                ProductoDetalleDTO coll = m.GetProductoForDetalleByCodigo(vm.Nombre, codLista);
                return Ok(coll);
            }
            return BadRequest("Entrada Invalida");
        }

        [HttpGet]
        [Route("api/productos/getStockFromProducto/{CodProducto}")]
        public IHttpActionResult GetStockFromProducto([FromUri] string CodProducto)
        {

            MaestroParametros mp = new MaestroParametros();
            ParametrosDTO param = mp.GetParametro("BodegasWeb");

            MaestroProductos m = new MaestroProductos();
            double stock = m.GetStockProducto(CodProducto, param.Valor);
            ProductosDTO p = new ProductosDTO();
            p.PrecioVta = Convert.ToDecimal(stock);
            return Ok(p);
        }

    }
}
