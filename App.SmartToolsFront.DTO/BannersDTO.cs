using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.SmartToolsFront.DTO
{
    public class BannersDTO
    {
        public int IdBanner { get; set; }
        public string CodProd { get; set; }
        public int IdTipoBanner { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public string Url { get; set; }
        public int Estado { get; set; }
    }
}
