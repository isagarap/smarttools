using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.SmartToolsFront.DTO
{
    public class ComprasClienteDTO
    {
        public string NVNumero { get; set; }
        public DateTime Fecha { get; set; }
        public string Estado { get; set; }
        public int Facturada { get; set; }
        public int Despachada { get; set; }
        public string NumOC { get; set; }
        public string CodAux { get; set; }
        public string Cliente { get; set; }
        public string VenCod { get; set; }
        public string Vendedor { get; set; }
        public string CodLista { get; set; }
        public string Lista { get; set; }
        public decimal Monto { get; set; }
    }

    public class ClienteSaldosDTO
    {
        public string Documento { get; set; }
        public double Nro { get; set; }
        public DateTime FechaEmision { get; set; }
        public DateTime FechaVcto { get; set; }
        public double Debe { get; set; }
        public double Haber { get; set; }
        public double Saldo { get; set; }
        public string Detalle { get; set; }
        public string Estado { get; set; }
        public string Pago { get; set; }
    }
}
