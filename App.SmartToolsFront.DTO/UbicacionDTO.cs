using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.SmartToolsFront.DTO
{
    public class UbicacionDTO
    {
        public RegionDTO Region { get; set; }
        public CiudadDTO Ciudad{ get; set; }
        public ComunaDTO Comuna { get; set; }
    }

    public class RegionDTO
    {
        public int IdRegion { get; set; }
        public string Descripcion { get; set; }
        public int Estado { get; set; }
    }

    public class CiudadDTO
    {
        public string CiuCod { get; set; }
        public string Descripcion { get; set; }
        public int IdRegion { get; set; }
        public int CodPostal { get; set; }
        public string Estado { get; set; }
    }

    public class ComunaDTO
    {
        public string ComCod { get; set; }
        public string Descripcion { get; set; }
        public int Id_Region { get; set; }
        public int Estado { get; set; }
    }

}
