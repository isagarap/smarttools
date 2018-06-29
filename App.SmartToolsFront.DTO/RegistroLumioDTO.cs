using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.SmartToolsFront.DTO
{
    public class RegistroLumioDTO
    {
        public int IdRegistro { get; set; }
        public DateTime FechaCompra { get; set; }
        public string NombreEmpresaProveedora { get; set; }
        public string TipoDocumento { get; set; }
        public string NotaVenta { get; set; }
        public string NroSerie { get; set; }
        public string NombrePropietario { get; set; }
        public string Rut { get; set; }
        public string Correo { get; set; }
    }
}
