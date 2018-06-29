using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.SmartToolsFront.DTO
{
    public class CategoriasDTO
    {
        public int Id { get; set; }
        public string CodGrupo { get; set; }
        public string DesGrupo { get; set; }
        public string Imagen { get; set; }
        public int Estado { get; set; }
        public int Cantidad { get; set; }
    }
}
