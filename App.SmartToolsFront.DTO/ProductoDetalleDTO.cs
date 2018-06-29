using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.SmartToolsFront.DTO
{
    public class ProductoDetalleDTO
    {
        public string CodProd { get; set; }
        public string DesProd { get; set; }
        public string DesProd2 { get; set; }
        public string CodBarra { get; set; }
        public string CodUmed { get; set; }
        public string CodCategoria { get; set; }
        public string CodSubCatergoria { get; set; }
        public decimal PrecioVta { get; set; }
        public decimal PrecioBoleta { get; set; }
        public decimal PesoKgs { get; set; }
        public int Estado { get; set; }
        public ProductosImagenes ImagenDefault { get; set; }
        public List<ProductosImagenes> Imagenes { get; set; }
        public List<ProductosDTO> ProductosRelacionados { get; set; }
        public int Cantidad { get; set; }
        public string NombreCategoria { get; set; }
        public string ProductoDestacado { get; set; }
        public int OrdenDestacado { get; set; }
        public List<FichaProductoDTO> FichasProducto { get; set; }
    }
}
