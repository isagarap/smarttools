using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.SmartToolsFront.DTO
{
    public class ClienteProductosDTO
    {
        public int Id { get; set; }
        public string CodProducto { get; set; }
        public int Cantidad { get; set; }
        public string Precio { get; set; }
        public DateTime Fecha { get; set; }
        public int Estado { get; set; }
        public string RutCliente { get; set; }
        public string CodAux { get; set; }
        public string Email { get; set; }
        public List<ProductosDTO> Productos { get; set; }
    }
}
