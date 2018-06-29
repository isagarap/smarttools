using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.SmartToolsFront.DTO
{
    public class CuponesDTO
    {
        public int IdCupon { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int IdTipoCupon { get; set; }
        public int IdTipoDescuento { get; set; }
        public decimal Descuento { get; set; }
        public int Estado { get; set; }
        public string CodProd { get; set; }
        public string Codigo { get; set; }
    }
}
