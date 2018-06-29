using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using App.SmartToolsFront.DAL;
using App.SmartToolsFront.DTO;

namespace App.SmartToolsFront.Web.Helpers
{
    public class CreaNotaVenta
    {
        public double CreaNotaVentaSofltand(int IdVenta)
        {
            double nventa = 0;
            try
            {
                //obtiene valor iva
                int iva = 19;
                MaestroParametros mpa = new MaestroParametros();
                ParametrosDTO param = mpa.GetParametro("Iva");
                if (param.Valor != null)
                    iva = Convert.ToInt32(param.Valor);

                //Nota de Venta
                MaestroVentas m = new DAL.MaestroVentas();
                VentaDTO vc = m.GetVentaById(IdVenta);
                List<VentaDetalleDTO> vd = m.GetDetallesVenta(IdVenta);

                MaestroClientes mc = new MaestroClientes();
                ClienteDTO cliente = mc.GetClienteByRut(vc.RutCliente);

                MaestroCondicionVentaTipoPago cvtp = new MaestroCondicionVentaTipoPago();
                List<CondicionVentaTipoPagoDTO> pago = cvtp.GetAllByCondVta(vc.CodCondVta);
                CondicionVentaTipoPagoDTO pagoFinal = pago.Where(x=> x.IdTipoPago == vc.IdTipoPago).FirstOrDefault();
                string tipoPagoDescripcion = "";
                try { tipoPagoDescripcion = pagoFinal.Descripcion; } catch { }

                string[] CodAuxs = vc.RutCliente.Replace(".", "").Split('-');
                string CodAux = CodAuxs[0].ToString().Trim();

                decimal descuento = 0;
                decimal subtotal = 0;
                decimal monto = 0;
                int index = 1;

                ProductosDTO prod = new ProductosDTO();
                MaestroProductos mp = new MaestroProductos();
                NotaVentaDetalleDTO n = new NotaVentaDetalleDTO();
                List<NotaVentaDetalleDTO> nvd = new List<NotaVentaDetalleDTO>();

                foreach (VentaDetalleDTO item in vd)
                {
                    monto = monto + item.Total;
                    descuento = descuento + item.Descuento;
                    subtotal = subtotal + item.SubTotal;

                    prod = mp.GetProductoByCodigo(item.CodProducto);

                    //remuevo el iva del precio
                    decimal vIva = (item.Precio / Convert.ToDecimal(1.19));
                    item.Precio = vIva;

                    n = new NotaVentaDetalleDTO
                    {
                        NVNumero = "",
                        nvLinea = index,
                        nvCorrela = 0,
                        nvFecCompr = DateTime.Now,
                        CodProd = item.CodProducto,
                        nvCant = item.Cantidad,
                        nvPrecio = item.Precio,  //sin iva
                        nvEquiv = 1,
                        nvSubTotal = item.Precio * item.Cantidad, //sin iva
                        nvTotLinea = item.Precio * item.Cantidad, //sin iva
                        nvCantDesp = 0,
                        nvCantProd = 0,
                        nvCantFact = 0,
                        nvCantDevuelto = 0,
                        nvCantNC = 0,
                        nvCantBoleta = 0,
                        nvCantOC = 0,
                        DetProd = prod.DesProd,
                        CheckeoMovporAlarmaVtas = "N",
                        CodPromocion = "",
                        CodUMed = prod.CodUmed,
                        CantUVta = prod.Cantidad
                    };

                    nvd.Add(n);
                    index = index + 1;
                }

                //Genera nota de venta
                NotaVentaDTO nvta = new NotaVentaDTO();
                nvta.Detalles = nvd;
                nvta.Cabecera = new NotaVentaCabeceraDTO
                {
                    RutCliente = vc.RutCliente,
                    NVNumero = "",
                    nvFem = DateTime.Now,
                    nvEstado = "A",
                    nvEstFact = 0,
                    nvEstDesp = 0,
                    nvEstRese = 0,
                    nvEstConc = 0,
                    CotNum = 0,
                    NumOC = 0,
                    nvFeEnt = DateTime.Now,
                    CodAux = CodAux,
                    VenCod = vc.CodVendedor,
                    CodMon = "01",
                    CodLista = cliente.CodLista,
                    nvObser = tipoPagoDescripcion,
                    nvCanalNV = "",
                    CveCod = "EFE",
                    NomCon = cliente.Contacto,
                    CodiCC = "",
                    CodBode = "",
                    nvSubTotal = subtotal, //sin iva
                    nvMonto = monto, //con iva
                    nvFeAprob = DateTime.Now,
                    NumGuiaRes = 0,
                    nvPorcFlete = 0,
                    nvValflete = 0,
                    nvPorcEmb = 0,
                    nvValEmb = 0,
                    nvEquiv = 1,
                    nvNetoExento = 0,
                    nvNetoAfecto = subtotal, 
                    nvTotalDesc = descuento,
                    ConcAuto = "N",
                    CheckeoPorAlarmaVtas = "N",
                    EnMantencion = 0,
                    Usuario = "",
                    UsuarioGeneraDocto = "softland",
                    FechaHoraCreacion = DateTime.Now,
                    Sistema = "NW",
                    ConcManual = "N",
                    RutSolicitante = "",
                    proceso = "Nota de Venta",
                    TotalBoleta = 0,
                    NumReq = 0,
                    CodLugarDesp = ""
                };

                MaestroMetodosSoftland ms = new MaestroMetodosSoftland();
                double NumNtaVenta = ms.SaveNotaVentaSoftland(nvta);
                nventa = NumNtaVenta;

                m.ActualizaNotaVenta_Venta(NumNtaVenta, IdVenta);

                try
                {
                    //Despacho
                    MaestroTipoDespacho mtd = new MaestroTipoDespacho();
                    VentaDespachoDTO vDes = m.GetDespachoVenta(IdVenta);
                    TipoDespachoDTO td = mtd.GetById(vDes.IdTipoDespacho);

                    DespachoSotlandDTO despacho = new DespachoSotlandDTO
                    {
                        CodAxD = nvta.Cabecera.CodAux,
                        NomDch = NumNtaVenta.ToString(),
                        DirDch = vDes.Direccion,
                        ComDch = vDes.ComCod,
                        CiuDch = vDes.CiuCom,
                        PaiDch = "CL",
                        Fon1Dch = vDes.Telefono,
                        AteDch = td.Nombre,
                        RegionDch = vDes.IdRegion,
                        Usuario = "Web",
                        Proceso = "IW_FACLIN",
                        FechaUlMod = DateTime.Now
                    };
                    ResponseInfo responseDespacho = ms.SaveDespachoSoftland(despacho);
                }
                catch { }
            }
            catch (Exception ex) { return 0; }
            return nventa;
        }
    }
}