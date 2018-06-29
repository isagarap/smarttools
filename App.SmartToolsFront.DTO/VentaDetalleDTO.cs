using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.SmartToolsFront.DTO
{
    public class VentaDetalleDTO
    {
        public int IdDetalle { get; set; }
        public int IdVenta { get; set; }
        public string CodProducto { get; set; }
        public int Correlativo { get; set; }
        public decimal Cantidad { get; set; }
        public decimal Precio { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Descuento { get; set; }
        public decimal Total { get; set; }
        public DateTime Fecha { get; set; }
    }
}
