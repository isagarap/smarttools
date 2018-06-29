using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.SmartToolsFront.DTO
{
    public class NotaVentaDTO
    {
        public NotaVentaCabeceraDTO Cabecera { get; set; }
        public List<NotaVentaDetalleDTO> Detalles { get; set; }
    }

    public class NotaVentaDetalleDTO
    {
        public string NVNumero { get; set; }
        public int nvLinea { get; set; }
        public int nvCorrela { get; set; }
        public DateTime nvFecCompr { get; set; }
        public string CodProd { get; set; }
        public decimal nvCant { get; set; }
        public decimal nvPrecio { get; set; }
        public decimal nvEquiv { get; set; }
        public decimal nvSubTotal { get; set; }
        public decimal nvTotLinea { get; set; }
        public int nvCantDesp { get; set; }
        public int nvCantProd { get; set; }
        public int nvCantFact { get; set; }
        public int nvCantDevuelto { get; set; }
        public int nvCantNC { get; set; }
        public int nvCantBoleta { get; set; }
        public int nvCantOC { get; set; }
        public string DetProd { get; set; }
        public string CheckeoMovporAlarmaVtas { get; set; }
        public string CodPromocion { get; set; }
        public string CodUMed { get; set; }
        public decimal CantUVta { get; set; }
    }

    public class NotaVentaCabeceraDTO
    {
        public string RutCliente { get; set; }
        public string NVNumero { get; set; }
        public DateTime nvFem { get; set; }
        public string nvEstado { get; set; }
        public int nvEstFact { get; set; }
        public int nvEstDesp { get; set; }
        public int nvEstRese { get; set; }
        public int nvEstConc { get; set; }
        public int CotNum { get; set; }
        public int NumOC { get; set; }
        public DateTime nvFeEnt { get; set; }
        public string CodAux { get; set; }
        public string VenCod { get; set; }
        public string CodMon { get; set; }
        public string CodLista { get; set; }
        public string nvObser { get; set; }
        public string nvCanalNV { get; set; }
        public string CveCod { get; set; }
        public string NomCon { get; set; }
        public string CodiCC { get; set; }
        public string CodBode { get; set; }
        public decimal nvSubTotal { get; set; }
        public decimal nvMonto { get; set; }
        public DateTime nvFeAprob { get; set; }
        public int NumGuiaRes { get; set; }
        public int nvPorcFlete { get; set; }
        public int nvValflete { get; set; }
        public int nvPorcEmb { get; set; }
        public int nvValEmb { get; set; }
        public int nvEquiv { get; set; }
        public decimal nvNetoExento { get; set; }
        public decimal nvNetoAfecto { get; set; }
        public decimal nvTotalDesc { get; set; }
        public string ConcAuto { get; set; }
        public string CheckeoPorAlarmaVtas { get; set; }
        public int EnMantencion { get; set; }
        public string Usuario { get; set; }
        public string UsuarioGeneraDocto { get; set; }
        public DateTime FechaHoraCreacion { get; set; }
        public string Sistema { get; set; }
        public string ConcManual { get; set; }
        public string RutSolicitante { get; set; }
        public string proceso { get; set; }
        public decimal TotalBoleta { get; set; }
        public decimal NumReq { get; set; }
        public string CodLugarDesp { get; set; }
    }

    public class AprobacionNvDTO
    {
        public string NvNumero { get; set; }
        public DateTime FechaHora { get; set; }
        public string Usuario { get; set; }
        public string Ap_Desap { get; set; }
        public string Comentario { get; set; }
    }

    public class ImpuestoNvDTO
    {
        public string nvNumero { get; set; }
        public string codimpto { get; set; }
        public decimal valpctIni { get; set; }
        public decimal afectoImpto { get; set; }
        public decimal Impto { get; set; }
    }

    public class DespachoSotlandDTO
    {
        public string CodAxD { get; set; }
        public string NomDch { get; set; }
        public string DirDch { get; set; }
        public string ComDch { get; set; }
        public string CiuDch { get; set; }
        public string PaiDch { get; set; }
        public string Fon1Dch { get; set; }
        public string AteDch { get; set; }
        public int RegionDch { get; set; }
        public string Usuario { get; set; }
        public string Proceso { get; set; }
        public DateTime FechaUlMod { get; set; }
    }

}
