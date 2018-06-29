using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.SmartToolsFront.DTO
{
    public class LogTbkDTO
    {
        public int Id { get; set; }
        public int IdVenta { get; set; }
        public DateTime Fecha { get; set; }
        public double Monto { get; set; }
        public string Token { get; set; }
        public string CodigoTbk { get; set; }
        public string Estado { get; set; }
        public string OrdenCompra { get; set; }
    }
}
