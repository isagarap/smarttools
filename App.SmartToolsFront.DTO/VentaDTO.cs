using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.SmartToolsFront.DTO
{
    public class VentaDTO
    {
        public int IdVenta { get; set; }
        public DateTime FechaVenta { get; set; }
        public string RutCliente { get; set; }
        public int IdCupon { get; set; }
        public string CodVendedor { get; set; }
        public string CodEstadoVenta { get; set; }
        public string CodCondVta { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Descuento { get; set; }
        public decimal PorcDescuento { get; set; }
        public decimal TotalDescuento { get; set; }
        public decimal Iva { get; set; }
        public decimal Total { get; set; }
        public int NVNumeroSoft { get; set; }
        public string EstadoSoft { get; set; }
        public string CodAuxSoft { get; set; }
        public string NvObserSoft { get; set; }
        public int IdTipoPago { get; set; }
        public List<VentaDetalleDTO> Detalles { get; set; }
        public VentaDespachoDTO Despacho { get; set; }
    }

    public class VentaDespachoDTO
    {
        public int IdDespacho { get; set; }
        public int IdVenta { get; set; }
        public int IdTipoDespacho { get; set; }
        public string Direccion { get; set; }
        public string Numero { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public int IdEstadoDespacho { get; set; }
        public int IdRegion { get; set; }
        public string CiuCom { get; set; }
        public string ComCod { get; set; }
        public DateTime FechaDespacho { get; set; }
    }

}
