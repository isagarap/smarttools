using App.SmartToolsFront.DTO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace App.SmartToolsFront.DAL
{
    public class MaestroMetodosSoftland
    {
        SqlConnection conSoftland = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSourceSoftland"].ConnectionString);

        public double SaveNotaVentaSoftland(NotaVentaDTO nta)
        {
            double notaSalida = 0;
            try
            {
                //recupera el contacto del cliente
                string NomCon = "L";
                MaestroClientes mc = new MaestroClientes();
                ClienteDTO cli = mc.GetClienteByRut(nta.Cabecera.RutCliente);
                if(cli != null && cli.Rut != null)
                    NomCon = cli.Contacto;

                //genera numero de nota de venta
                nta.Cabecera.NVNumero = this.GetNumeroNotaVenta();
                nta.Cabecera.CodLugarDesp = nta.Cabecera.NVNumero.ToString();
                notaSalida = Convert.ToDouble(nta.Cabecera.NVNumero);
                conSoftland.Open();

                SqlCommand cmdC = new SqlCommand("INSERT INTO [softland].[nw_nventa] ([NVNumero] ,[nvFem] ,[nvEstado] ,[nvEstFact] ,[nvEstDesp] ,[nvEstRese] ,[nvEstConc] ,[CotNum] ,[NumOC] ,[nvFeEnt] ,[CodAux] , " + "\n" +
                                                "[VenCod],[CodMon],[CodLista],[nvObser],[nvCanalNV],[CveCod],[NomCon],[CodiCC],[CodBode],[nvSubTotal],[nvMonto],[nvFeAprob],[NumGuiaRes],[nvPorcFlete], " + "\n" +
                                                "[nvValflete],[nvPorcEmb],[nvValEmb],[nvEquiv],[nvNetoExento],[nvNetoAfecto],[nvTotalDesc],[ConcAuto],[CheckeoPorAlarmaVtas],[EnMantencion],[Usuario], " + "\n" +
                                                "[UsuarioGeneraDocto],[FechaHoraCreacion],[Sistema],[ConcManual],[RutSolicitante],[proceso],[TotalBoleta],[NumReq],[CodLugarDesp])  " + "\n" +
                                                "VALUES(@NVNumero,@nvFem,@nvEstado,@nvEstFact,@nvEstDesp,@nvEstRese,@nvEstConc,@CotNum,@NumOC,@nvFeEnt,@CodAux,@VenCod,@CodMon,@CodLista,@nvObser,@nvCanalNV,@CveCod,@NomCon, " + "\n" +
                                                "@CodiCC,@CodBode,@nvSubTotal,@nvMonto,@nvFeAprob,@NumGuiaRes,@nvPorcFlete,@nvValflete,@nvPorcEmb,@nvValEmb,@nvEquiv,@nvNetoExento,@nvNetoAfecto,@nvTotalDesc,@ConcAuto,@CheckeoPorAlarmaVtas, " + "\n" +
                                                "@EnMantencion, @Usuario,@UsuarioGeneraDocto,@FechaHoraCreacion,@Sistema,@ConcManual,@RutSolicitante,@proceso,@TotalBoleta,@NumReq,@CodLugarDesp)");

                cmdC.CommandType = CommandType.Text;
                cmdC.Connection = conSoftland;
                cmdC.Parameters.AddWithValue("@NVNumero", nta.Cabecera.NVNumero);
                cmdC.Parameters.AddWithValue("@nvFem", DateTime.Now.Date);
                cmdC.Parameters.AddWithValue("@nvEstado", "A");
                cmdC.Parameters.AddWithValue("@nvEstFact", 0);
                cmdC.Parameters.AddWithValue("@nvEstDesp", 0);
                cmdC.Parameters.AddWithValue("@nvEstRese", 0);
                cmdC.Parameters.AddWithValue("@nvEstConc", 0);
                cmdC.Parameters.AddWithValue("@CotNum", 0);
                cmdC.Parameters.AddWithValue("@NumOC", 0);
                cmdC.Parameters.AddWithValue("@nvFeEnt", DateTime.Now.Date);
                cmdC.Parameters.AddWithValue("@CodAux", nta.Cabecera.CodAux);
                cmdC.Parameters.AddWithValue("@VenCod", nta.Cabecera.VenCod);
                cmdC.Parameters.AddWithValue("@CodMon", "01");
                cmdC.Parameters.AddWithValue("@CodLista", nta.Cabecera.CodLista);
                cmdC.Parameters.AddWithValue("@nvObser", nta.Cabecera.nvObser);
                cmdC.Parameters.AddWithValue("@nvCanalNV", DBNull.Value);
                cmdC.Parameters.AddWithValue("@CveCod", "EFE");
                cmdC.Parameters.AddWithValue("@NomCon", NomCon);
                cmdC.Parameters.AddWithValue("@CodiCC", DBNull.Value);
                cmdC.Parameters.AddWithValue("@CodBode", DBNull.Value);
                cmdC.Parameters.AddWithValue("@nvSubTotal", nta.Cabecera.nvSubTotal);
                cmdC.Parameters.AddWithValue("@nvMonto", nta.Cabecera.nvMonto);
                cmdC.Parameters.AddWithValue("@nvFeAprob", DBNull.Value);
                cmdC.Parameters.AddWithValue("@NumGuiaRes", 0);
                cmdC.Parameters.AddWithValue("@nvPorcFlete", 0);
                cmdC.Parameters.AddWithValue("@nvValflete", 0);
                cmdC.Parameters.AddWithValue("@nvPorcEmb", 0);
                cmdC.Parameters.AddWithValue("@nvValEmb", 0);
                cmdC.Parameters.AddWithValue("@nvEquiv", 1);
                cmdC.Parameters.AddWithValue("@nvNetoExento", 0);
                cmdC.Parameters.AddWithValue("@nvNetoAfecto", nta.Cabecera.nvNetoAfecto);
                cmdC.Parameters.AddWithValue("@nvTotalDesc", nta.Cabecera.nvTotalDesc);
                cmdC.Parameters.AddWithValue("@ConcAuto", "N");
                cmdC.Parameters.AddWithValue("@CheckeoPorAlarmaVtas", "N");
                cmdC.Parameters.AddWithValue("@EnMantencion", 0);
                cmdC.Parameters.AddWithValue("@Usuario", DBNull.Value);
                cmdC.Parameters.AddWithValue("@UsuarioGeneraDocto", "softland");
                cmdC.Parameters.AddWithValue("@FechaHoraCreacion", DateTime.Now.Date);
                cmdC.Parameters.AddWithValue("@Sistema", "NW");
                cmdC.Parameters.AddWithValue("@ConcManual", "N");
                cmdC.Parameters.AddWithValue("@RutSolicitante", DBNull.Value);
                cmdC.Parameters.AddWithValue("@proceso", "Notas de Venta");
                cmdC.Parameters.AddWithValue("@TotalBoleta", 0);
                cmdC.Parameters.AddWithValue("@NumReq", 0);
                cmdC.Parameters.AddWithValue("@CodLugarDesp", nta.Cabecera.CodLugarDesp);

                cmdC.ExecuteNonQuery();

                foreach (NotaVentaDetalleDTO item in nta.Detalles)
                {
                    SqlCommand cmdD = new SqlCommand("INSERT INTO [softland].[nw_detnv] ([NVNumero] ,[nvLinea] ,[nvCorrela] ,[nvFecCompr] ,[CodProd] ,[nvCant] ,[nvPrecio] , " + "\n" +
                                                "[nvEquiv] ,[nvSubTotal] ,[nvTotLinea] ,[nvCantDesp] , " + "\n" +
                                                "[nvCantProd],[nvCantFact],[nvCantDevuelto],[nvCantNC],[nvCantBoleta],[nvCantOC], " + "\n" +
                                                "[DetProd],[CheckeoMovporAlarmaVtas],[CodPromocion],[CodUMed],[CantUVta]) " + "\n" +
                                                "VALUES(@NVNumero, @nvLinea, @nvCorrela, @nvFecCompr, @CodProd, @nvCant, @nvPrecio, @nvEquiv, " + "\n" +
                                                "@nvSubTotal, @nvTotLinea, @nvCantDesp, @nvCantProd, @nvCantFact, @nvCantDevuelto, @nvCantNC, @nvCantBoleta, @nvCantOC, " + "\n" +
                                                "(select desprod from softland.iw_tprod where codprod = @CodProd) ,@CheckeoMovporAlarmaVtas , @CodPromocion , " + "\n" +
                                                "(select CodUMed from softland.iw_tprod where codprod = @CodProd) ,@CantUVta)");

                    item.NVNumero = nta.Cabecera.NVNumero;

                    cmdD.CommandType = CommandType.Text;
                    cmdD.Connection = conSoftland;
                    cmdD.Parameters.AddWithValue("@NVNumero", item.NVNumero);
                    cmdD.Parameters.AddWithValue("@nvLinea", item.nvLinea);
                    cmdD.Parameters.AddWithValue("@nvCorrela", 0);
                    cmdD.Parameters.AddWithValue("@nvFecCompr", item.nvFecCompr.Date);
                    cmdD.Parameters.AddWithValue("@CodProd", item.CodProd);
                    cmdD.Parameters.AddWithValue("@nvCant", item.nvCant);
                    cmdD.Parameters.AddWithValue("@nvPrecio", item.nvPrecio);
                    cmdD.Parameters.AddWithValue("@nvEquiv", 1);
                    cmdD.Parameters.AddWithValue("@nvSubTotal", item.nvSubTotal);
                    cmdD.Parameters.AddWithValue("@nvTotLinea", item.nvTotLinea);
                    cmdD.Parameters.AddWithValue("@nvCantDesp", 0);
                    cmdD.Parameters.AddWithValue("@nvCantProd", 0);
                    cmdD.Parameters.AddWithValue("@nvCantFact", 0);
                    cmdD.Parameters.AddWithValue("@nvCantDevuelto", 0);
                    cmdD.Parameters.AddWithValue("@nvCantNC", 0);
                    cmdD.Parameters.AddWithValue("@nvCantBoleta", 0);
                    cmdD.Parameters.AddWithValue("@nvCantOC", 0);
                    //cmd.Parameters.AddWithValue("@DetProd", "");
                    cmdD.Parameters.AddWithValue("@CheckeoMovporAlarmaVtas", "N");
                    cmdD.Parameters.AddWithValue("@CodPromocion", DBNull.Value);
                    //cmdD.Parameters.AddWithValue("@CodUMed", item.CodUMed);
                    cmdD.Parameters.AddWithValue("@CantUVta", item.nvCant);
                    cmdD.ExecuteNonQuery();
                }                
                conSoftland.Close();

                ImpuestoNvDTO imp = new ImpuestoNvDTO { nvNumero = nta.Cabecera.NVNumero, codimpto = "IVA", valpctIni = 19, afectoImpto = nta.Cabecera.nvNetoAfecto, Impto = 0 };
                AprobacionNvDTO aprob = new AprobacionNvDTO { NvNumero = nta.Cabecera.NVNumero, FechaHora = DateTime.Now, Usuario = "softland", Ap_Desap = "APRUEBA", Comentario = "" };

                ResponseInfo s1 = this.SaveImpuestoNotaVentaSoftland(imp);
                ResponseInfo s2 = this.SaveAprobacionNotaVentaSoftland(aprob);

                return notaSalida;
            }
            catch (Exception ex) { return 0; }
        }

        public ResponseInfo SaveAprobacionNotaVentaSoftland(AprobacionNvDTO nta)
        {
            try
            {
                conSoftland.Open();

                SqlCommand cmdC = new SqlCommand("INSERT INTO [softland].[NW_aprobDetalle] ([NvNumero] ,[FechaHora] ,[Usuario] ,[Ap_Desap] ,[Comentario]) " +
                                                 "VALUES (@NvNumero, @FechaHora, @Usuario, @Ap_Desap, @Comentario)");
                cmdC.CommandType = CommandType.Text;
                cmdC.Connection = conSoftland;
                cmdC.Parameters.AddWithValue("@NvNumero", nta.NvNumero);
                cmdC.Parameters.AddWithValue("@FechaHora", DateTime.Now.Date);
                cmdC.Parameters.AddWithValue("@Usuario", "softland");
                cmdC.Parameters.AddWithValue("@Ap_Desap", "APRUEBA");
                cmdC.Parameters.AddWithValue("@Comentario", "APROBACIÓN AUTOMÁTICA DE NOTA DE VENTA");
                cmdC.ExecuteNonQuery();
                conSoftland.Close();

                return ResponseInfo.CreateSuccess();
            }
            catch (Exception ex) { return ResponseInfo.CreateError("Error al grabar aprobación nota de venta. " + ex.Message); }
        }

        public ResponseInfo SaveImpuestoNotaVentaSoftland(ImpuestoNvDTO nta)
        {
            try
            {
                conSoftland.Open();

                SqlCommand cmdC = new SqlCommand("INSERT INTO [softland].[nw_impto] ([nvNumero] ,[codimpto] ,[valpctIni] ,[afectoImpto] ,[Impto]) " +
                                                 "VALUES (@nvNumero, @codimpto, @valpctIni, (SELECT nvNetoAfecto FROM SOFTLAND.nw_nventa WHERE NVNumero = @nvNumero), " +
                                                 "((SELECT nvNetoAfecto FROM SOFTLAND.nw_nventa WHERE NVNumero = @nvNumero) * 0.19))");
                cmdC.CommandType = CommandType.Text;
                cmdC.Connection = conSoftland;
                cmdC.Parameters.AddWithValue("@nvNumero", nta.nvNumero);
                cmdC.Parameters.AddWithValue("@codimpto", "IVA");
                cmdC.Parameters.AddWithValue("@valpctIni", 19);
                //cmdC.Parameters.AddWithValue("@afectoImpto", nta.afectoImpto);
                //cmdC.Parameters.AddWithValue("@Impto", nta.Impto);
                cmdC.ExecuteNonQuery();
                conSoftland.Close();

                return ResponseInfo.CreateSuccess();
            }
            catch (Exception ex) { return ResponseInfo.CreateError("Error al grabar aprobación nota de venta. " + ex.Message); }
        }

        public string GetNumeroNotaVenta()
        {
            conSoftland.Open();
            string codigo = string.Empty;
            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "Select max(NVNumero) + 1 as codigo from softland.nw_nventa";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = conSoftland;
            reader = cmd.ExecuteReader();

            ClienteDTO item = new ClienteDTO();
            while (reader.Read())
            {
                codigo = reader["codigo"].ToString();

            }
            reader.Close();
            conSoftland.Close();
            return codigo;
        }

        public List<ComprasClienteDTO> GetClientesComprasSoftland(string rutCliente)
        {
            conSoftland.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT     softland.nw_nventa.NVNumero, softland.nw_nventa.nvFem AS Fecha, softland.NW_vsnpEstadoNW.NVEstado AS Estado, " +
                             "                      softland.NW_vsnpEstadoNW.NVEstFact AS Facturada, softland.NW_vsnpEstadoNW.NVEstDesp AS Despachada, softland.nw_nventa.NumOC,  " +
                             "                      softland.nw_nventa.CodAux, softland.cwtauxi.CodAux AS Cliente, softland.nw_nventa.VenCod, softland.cwtvend.VenDes AS Vendedor, softland.nw_nventa.CodLista,  " +
                             "                      softland.iw_tlispre.DesLista AS Lista, softland.nw_nventa.nvMonto AS Monto " +
                             "FROM         softland.nw_nventa LEFT OUTER JOIN " +
                             "                      softland.iw_tlispre ON softland.nw_nventa.CodLista = softland.iw_tlispre.CodLista LEFT OUTER JOIN " +
                             "                      softland.cwtauxi ON softland.nw_nventa.CodAux = softland.cwtauxi.CodAux LEFT OUTER JOIN " +
                             "                      softland.cwtvend ON softland.nw_nventa.VenCod = softland.cwtvend.VenCod LEFT OUTER JOIN " +
                             "                      softland.NW_vsnpEstadoNW ON softland.nw_nventa.NVNumero = softland.NW_vsnpEstadoNW.NVNumero " +
                             "WHERE(softland.nw_nventa.CodAux = '" + rutCliente + "')";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = conSoftland;
            reader = cmd.ExecuteReader();

            List<ComprasClienteDTO> retorno = new List<ComprasClienteDTO>();
            while (reader.Read())
            {
                ComprasClienteDTO item = new ComprasClienteDTO();
                item.NVNumero = reader["NVNumero"].ToString();
                item.Fecha = (reader["Fecha"] == DBNull.Value) ? DateTime.Now : Convert.ToDateTime(reader["Fecha"]);
                item.Estado = (reader["Estado"] == DBNull.Value) ? "" : reader["Estado"].ToString();
                item.Facturada = (reader["Facturada"] == DBNull.Value) ? 0: Convert.ToInt32(reader["Facturada"]);
                item.Despachada = (reader["Despachada"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["Despachada"]);
                item.NumOC = (reader["NumOC"] == DBNull.Value) ? "" : reader["NumOC"].ToString();
                item.CodAux = (reader["CodAux"] == DBNull.Value) ? "" : reader["CodAux"].ToString();
                item.Cliente = (reader["Cliente"] == DBNull.Value) ? "" : reader["Cliente"].ToString();
                item.VenCod = (reader["VenCod"] == DBNull.Value) ? "" : reader["VenCod"].ToString();
                item.Vendedor = (reader["Vendedor"] == DBNull.Value) ? "" : reader["Vendedor"].ToString();
                item.CodLista = (reader["CodLista"] == DBNull.Value) ? "" : reader["CodLista"].ToString();
                item.Lista = (reader["Lista"] == DBNull.Value) ? "" : reader["Lista"].ToString();
                item.Monto = (reader["Monto"] == DBNull.Value) ? 0 : Convert.ToDecimal(reader["Monto"]);
                retorno.Add(item);
            }
            reader.Close();
            conSoftland.Close();
            return retorno;
        }


        public List<ClienteSaldosDTO> GetClienteEstadoComprasFromSoftland(string codaux)
        {
            conSoftland.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT     softland.cwttdoc.DesDoc AS Documento, softland.cwmovim.NumDoc AS Nro, softland.cwmovim.MovFe AS Femision, softland.cwmovim.MovFv AS Fvencimiento,  " +
                              "                      softland.cwmovim.MovDebe AS Debe, softland.cwmovim.MovHaber AS Haber, softland.cwmovim.MovDebe - softland.cwmovim.MovHaber AS Saldo, " +
                              "                      CASE WHEN softland.cwmovim.MovFv <= GETDATE() THEN 'Vencido' else '' end as estado " +
                              "FROM softland.cwcpbte INNER JOIN " +
                              "                      softland.cwmovim ON softland.cwcpbte.CpbNum = softland.cwmovim.CpbNum AND softland.cwcpbte.CpbAno = softland.cwmovim.CpbAno INNER JOIN " +
                              "                      softland.cwpctas ON softland.cwmovim.PctCod = softland.cwpctas.PCCODI LEFT OUTER JOIN " +
                              "                      softland.cwttdoc ON softland.cwmovim.TtdCod = softland.cwttdoc.CodDoc LEFT OUTER JOIN " +
                              "                      softland.cwtccos ON softland.cwmovim.CcCod = softland.cwtccos.CodiCC " +
                              "WHERE(softland.cwcpbte.CpbEst = 'V') AND(softland.cwmovim.CodAux = '" + codaux + "') AND(softland.cwcpbte.CpbNum <> '00000000') AND " +
                              "               (softland.cwmovim.CpbFec <= GETDATE()) AND(softland.cwmovim.PctCod = '1-01-14') OR " +
                              "              (softland.cwcpbte.CpbEst = 'V') AND(softland.cwmovim.CodAux = '" + codaux + "') AND(softland.cwmovim.PctCod = '1-01-14') AND(softland.cwmovim.CpbAno = YEAR(DATEADD(YEAR, -1, GETDATE()))) AND " +
                              "           (softland.cwmovim.CpbMes = '00') " +
                              "GROUP BY softland.cwmovim.MovDebe - softland.cwmovim.MovHaber, softland.cwmovim.NumDoc, softland.cwmovim.MovFe, softland.cwmovim.MovFv,  " +
                              "                      softland.cwmovim.MovDebe, softland.cwmovim.MovHaber, softland.cwmovim.MovGlosa, softland.cwttdoc.DesDoc " +
                              "UNION " +
                              "SELECT dbo.COBRANZA2.Documento, dbo.COBRANZA2.Nro, softland.cwmovim.MovFe AS Femision, softland.cwmovim.MovFv AS Fvencimiento,  " +
                              "                      softland.cwmovim.MovDebe AS Debe, softland.cwmovim.MovHaber AS Haber, dbo.COBRANZA2.SALDO AS Saldo, " +
                              "                      CASE WHEN softland.cwmovim.MovFv <= GETDATE() THEN 'Vencido' else '' end as estado " +
                              "FROM dbo.COBRANZA2 INNER JOIN " +
                              "                      softland.cwmovim ON dbo.COBRANZA2.TipoDoc = softland.cwmovim.TtdCod AND dbo.COBRANZA2.Nro = softland.cwmovim.NumDoc " +
                              "WHERE(dbo.COBRANZA2.CodAux = '" + codaux + "') AND(softland.cwmovim.CpbAno = YEAR(GETDATE()))";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = conSoftland;
            reader = cmd.ExecuteReader();

            List<ClienteSaldosDTO> retorno = new List<ClienteSaldosDTO>();
            while (reader.Read())
            {
                ClienteSaldosDTO item = new ClienteSaldosDTO();
                item.Documento = reader["Documento"].ToString();
                item.Nro = (reader["Nro"] == DBNull.Value) ? 0 : Convert.ToDouble(reader["Nro"]);
                item.FechaEmision = (reader["Femision"] == DBNull.Value) ? DateTime.Now : Convert.ToDateTime(reader["Femision"]);
                item.FechaVcto = (reader["Fvencimiento"] == DBNull.Value) ? DateTime.Now : Convert.ToDateTime(reader["Fvencimiento"]);
                item.Debe = (reader["Debe"] == DBNull.Value) ? 0 : Convert.ToDouble(reader["Debe"]);
                item.Haber = (reader["Haber"] == DBNull.Value) ? 0 : Convert.ToDouble(reader["Haber"]);
                item.Saldo = (reader["Saldo"] == DBNull.Value) ? 0 : Convert.ToDouble(reader["Saldo"]);
                item.Detalle = ""; // reader["Detalle"].ToString();
                item.Estado = reader["Estado"].ToString();
                item.Pago = ""; // reader["Pago"].ToString();
                retorno.Add(item);
            }
            reader.Close();
            conSoftland.Close();
            return retorno;
        }

        public ResponseInfo SaveDespachoSoftland(DespachoSotlandDTO des)
        {
            try
            {
                conSoftland.Open();

                SqlCommand cmdC = new SqlCommand("INSERT INTO [softland].[cwtauxd] ([CodAxD] ,[NomDch] ,[DirDch] ,[ComDch] ,[CiuDch] ,[PaiDch] ,[Fon1Dch] ,[AteDch] ,[RegionDch] ,[Usuario] ,[Proceso] ,[FechaUlMod]) "+
                                                 "VALUES (@CodAxD, @NomDch, @DirDch, @ComDch, @CiuDch, @PaiDch, @Fon1Dch, @AteDch, @RegionDch, @Usuario, @Proceso, @FechaUlMod)");

                cmdC.CommandType = CommandType.Text;
                cmdC.Connection = conSoftland;
                cmdC.Parameters.AddWithValue("@CodAxD", des.CodAxD);
                cmdC.Parameters.AddWithValue("@NomDch", des.NomDch);
                cmdC.Parameters.AddWithValue("@DirDch", des.DirDch);
                cmdC.Parameters.AddWithValue("@ComDch", des.ComDch);
                cmdC.Parameters.AddWithValue("@CiuDch", des.CiuDch);
                cmdC.Parameters.AddWithValue("@PaiDch", des.PaiDch);
                cmdC.Parameters.AddWithValue("@Fon1Dch", des.Fon1Dch);
                cmdC.Parameters.AddWithValue("@AteDch", des.AteDch);
                cmdC.Parameters.AddWithValue("@RegionDch", des.RegionDch);
                cmdC.Parameters.AddWithValue("@Usuario", des.Usuario);
                cmdC.Parameters.AddWithValue("@Proceso", des.Proceso);
                cmdC.Parameters.AddWithValue("@FechaUlMod", DateTime.Now);
                cmdC.ExecuteNonQuery();
                conSoftland.Close();

                return ResponseInfo.CreateSuccess();
            }
            catch (Exception ex) { return ResponseInfo.CreateError(ex.Message); }
        }

    }
}
