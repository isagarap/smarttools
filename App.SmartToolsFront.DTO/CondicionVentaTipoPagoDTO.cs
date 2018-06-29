using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.SmartToolsFront.DTO
{
    public class CondicionVentaTipoPagoDTO
    {
        public int IdCondVtaTipoPago { get; set; }
        public int IdTipoPago { get; set; }
        public string CodCondVta { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
    }
}
