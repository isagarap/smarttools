using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.SmartToolsFront.DTO
{
    public class SuscripcionesDTO
    {
        public int IdSuscripcion { get; set; }
        public string Email { get; set; }
        public DateTime FechaSuscripcion { get; set; }
        public int Estado { get; set; }
    }
}
