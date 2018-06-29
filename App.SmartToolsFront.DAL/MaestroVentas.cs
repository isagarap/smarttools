using App.SmartToolsFront.DTO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace App.SmartToolsFront.DAL
{
    public class MaestroVentas
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString);
        public List<VentaDTO> GetAllVentas()
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT ISNULL(IdVenta,0) AS IdVenta " +
                              "   ,FechaVenta " +
                              "   ,ISNULL(RutCliente, '') AS RutCliente " +
                              "    , ISNULL(IdCupon,0) AS IdCupon " +
                              "     , ISNULL(CodVendedor,'') AS CodVendedor " +
                              "      , ISNULL(CodEstadoVenta,'') AS CodEstadoVenta " +
                              "       , ISNULL(CodCondVta,'') AS CodCondVta " +
                              "        , ISNULL(SubTotal,0) AS SubTotal " +
                              "         , ISNULL(Descuento,0) AS Descuento " +
                              "          , ISNULL(PorcDescuento,0) AS PorcDescuento " +
                              "           , ISNULL(TotalDescuento,0) AS TotalDescuento " +
                              "            , ISNULL(Iva,0) AS Iva " +
                              "             , ISNULL(Total,0) AS Total " +
                              "              , ISNULL(NVNumeroSoft,0) AS NVNumeroSoft " +
                              "               , ISNULL(EstadoSoft,'') AS EstadoSoft " +
                              "                , ISNULL(CodAuxSoft,'') AS CodAuxSoft " +
                              "                 , ISNULL(NvObserSoft,'') AS NvObserSoft " +
                              "FROM[dbo].[Venta]";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            List<VentaDTO> retorno = new List<VentaDTO>();
            while (reader.Read())
            {
                VentaDTO item = new VentaDTO();
                item.IdVenta = Convert.ToInt32(reader["IdVenta"]);
                item.FechaVenta = Convert.ToDateTime(reader["FechaVenta"]);
                item.RutCliente = reader["RutCliente"].ToString();
                item.IdCupon = Convert.ToInt32(reader["IdCupon"]);
                item.CodVendedor = reader["CodVendedor"].ToString();
                item.CodEstadoVenta = reader["CodEstadoVenta"].ToString();
                item.CodCondVta = reader["CodCondVta"].ToString();
                item.SubTotal = Convert.ToDecimal(reader["SubTotal"]);
                item.Descuento = Convert.ToDecimal(reader["Descuento"]);
                item.PorcDescuento = Convert.ToDecimal(reader["PorcDescuento"]);
                item.TotalDescuento = Convert.ToDecimal(reader["TotalDescuento"]);
                item.Iva = Convert.ToDecimal(reader["Iva"]);
                item.Total = Convert.ToDecimal(reader["Total"]);
                item.NVNumeroSoft = Convert.ToInt32(reader["NVNumeroSoft"]);
                item.EstadoSoft = reader["EstadoSoft"].ToString();
                item.CodAuxSoft = reader["CodAuxSoft"].ToString();
                item.NvObserSoft = reader["NvObserSoft"].ToString();
                item.Detalles = this.GetDetallesVenta(item.IdVenta);
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

        public List<VentaDTO> GetAllVentasByRutCliente(string RutCliente)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT ISNULL(IdVenta,0) AS IdVenta " +
                              "   ,FechaVenta " +
                              "   ,ISNULL(RutCliente, '') AS RutCliente " +
                              "    , ISNULL(IdCupon,0) AS IdCupon " +
                              "     , ISNULL(CodVendedor,'') AS CodVendedor " +
                              "      , ISNULL(CodEstadoVenta,'') AS CodEstadoVenta " +
                              "       , ISNULL(CodCondVta,'') AS CodCondVta " +
                              "        , ISNULL(SubTotal,0) AS SubTotal " +
                              "         , ISNULL(Descuento,0) AS Descuento " +
                              "          , ISNULL(PorcDescuento,0) AS PorcDescuento " +
                              "           , ISNULL(TotalDescuento,0) AS TotalDescuento " +
                              "            , ISNULL(Iva,0) AS Iva " +
                              "             , ISNULL(Total,0) AS Total " +
                              "              , ISNULL(NVNumeroSoft,0) AS NVNumeroSoft " +
                              "               , ISNULL(EstadoSoft,'') AS EstadoSoft " +
                              "                , ISNULL(CodAuxSoft,'') AS CodAuxSoft " +
                              "                 , ISNULL(NvObserSoft,'') AS NvObserSoft " +
                              "FROM[dbo].[Venta] Where RutCliente = '" + RutCliente + "'";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            List<VentaDTO> retorno = new List<VentaDTO>();
            while (reader.Read())
            {
                VentaDTO item = new VentaDTO();
                item.IdVenta = Convert.ToInt32(reader["IdVenta"]);
                item.FechaVenta = Convert.ToDateTime(reader["FechaVenta"]);
                item.RutCliente = reader["RutCliente"].ToString();
                item.IdCupon = Convert.ToInt32(reader["IdCupon"]);
                item.CodVendedor = reader["CodVendedor"].ToString();
                item.CodEstadoVenta = reader["CodEstadoVenta"].ToString();
                item.CodCondVta = reader["CodCondVta"].ToString();
                item.SubTotal = Convert.ToDecimal(reader["SubTotal"]);
                item.Descuento = Convert.ToDecimal(reader["Descuento"]);
                item.PorcDescuento = Convert.ToDecimal(reader["PorcDescuento"]);
                item.TotalDescuento = Convert.ToDecimal(reader["TotalDescuento"]);
                item.Iva = Convert.ToDecimal(reader["Iva"]);
                item.Total = Convert.ToDecimal(reader["Total"]);
                item.NVNumeroSoft = Convert.ToInt32(reader["NVNumeroSoft"]);
                item.EstadoSoft = reader["EstadoSoft"].ToString();
                item.CodAuxSoft = reader["CodAuxSoft"].ToString();
                item.NvObserSoft = reader["NvObserSoft"].ToString();
                item.Detalles = this.GetDetallesVenta(item.IdVenta);
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

        public VentaDTO GetVentaById(int IdVenta)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT ISNULL(IdVenta,0) AS IdVenta " +
                              "   ,FechaVenta " +
                              "   ,ISNULL(RutCliente, '') AS RutCliente " +
                              "    , ISNULL(IdCupon,0) AS IdCupon " +
                              "     , ISNULL(CodVendedor,'') AS CodVendedor " +
                              "      , ISNULL(CodEstadoVenta,'') AS CodEstadoVenta " +
                              "       , ISNULL(CodCondVta,'') AS CodCondVta " +
                              "        , ISNULL(SubTotal,0) AS SubTotal " +
                              "         , ISNULL(Descuento,0) AS Descuento " +
                              "          , ISNULL(PorcDescuento,0) AS PorcDescuento " +
                              "           , ISNULL(TotalDescuento,0) AS TotalDescuento " +
                              "            , ISNULL(Iva,0) AS Iva " +
                              "             , ISNULL(Total,0) AS Total " +
                              "              , ISNULL(NVNumeroSoft,0) AS NVNumeroSoft " +
                              "               , ISNULL(EstadoSoft,'') AS EstadoSoft " +
                              "                , ISNULL(CodAuxSoft,'') AS CodAuxSoft " +
                              "                 , ISNULL(NvObserSoft,'') AS NvObserSoft " +
                              "                 , ISNULL(IdTipoPago,0) AS IdTipoPago " +
                              "FROM[dbo].[Venta] WHERE IdVenta = " + IdVenta + "";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            VentaDTO item = new VentaDTO();
            while (reader.Read())
            {
                item.IdVenta = Convert.ToInt32(reader["IdVenta"]);
                item.FechaVenta = Convert.ToDateTime(reader["FechaVenta"]);
                item.RutCliente = reader["RutCliente"].ToString();
                item.IdCupon = Convert.ToInt32(reader["IdCupon"]);
                item.CodVendedor = reader["CodVendedor"].ToString();
                item.CodEstadoVenta = reader["CodEstadoVenta"].ToString();
                item.CodCondVta = reader["CodCondVta"].ToString();
                item.SubTotal = Convert.ToDecimal(reader["SubTotal"]);
                item.Descuento = Convert.ToDecimal(reader["Descuento"]);
                item.PorcDescuento = Convert.ToDecimal(reader["PorcDescuento"]);
                item.TotalDescuento = Convert.ToDecimal(reader["TotalDescuento"]);
                item.Iva = Convert.ToDecimal(reader["Iva"]);
                item.Total = Convert.ToDecimal(reader["Total"]);
                item.NVNumeroSoft = Convert.ToInt32(reader["NVNumeroSoft"]);
                item.EstadoSoft = reader["EstadoSoft"].ToString();
                item.CodAuxSoft = reader["CodAuxSoft"].ToString();
                item.NvObserSoft = reader["NvObserSoft"].ToString();
                item.IdTipoPago = (reader["IdTipoPago"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["IdTipoPago"]);
            }
            reader.Close();
            con.Close();

            item.Detalles = this.GetDetallesVenta(item.IdVenta);              
            return item;
        }

        public List<VentaDetalleDTO> GetDetallesVenta(int IdVenta)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT ISNULL([IdDetalle],0) AS [IdDetalle] " +
                              ",ISNULL([IdVenta],0) AS[IdVenta] " +
                              ",ISNULL([CodProd],'') AS[CodProd] " +
                              ",ISNULL([Correlativo],0) AS[Correlativo] " +
                              ",ISNULL([Cantidad],0) AS[Cantidad] " +
                              ",ISNULL([Precio],0) AS[Precio] " +
                              ",ISNULL([SubTotal],0) AS[SubTotal] " +
                              ",ISNULL([Descuento],0) AS[Descuento] " +
                              ",ISNULL([Total],0) AS[Total] " +
                              ",[Fecha] " +
                              "  FROM[dbo].[VentaDetalle] " +
                              "  WHERE[IdVenta] = "+ IdVenta + "";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            List<VentaDetalleDTO> retorno = new List<VentaDetalleDTO>();
            while (reader.Read())
            {
                VentaDetalleDTO item = new VentaDetalleDTO();
                item.IdDetalle = Convert.ToInt32(reader["IdDetalle"]);
                item.IdVenta = Convert.ToInt32(reader["IdVenta"]);
                item.CodProducto = Convert.ToString(reader["CodProd"]);
                item.Correlativo = Convert.ToInt32(reader["Correlativo"]);
                item.Cantidad = Convert.ToDecimal(reader["Cantidad"]);
                item.Precio = Convert.ToDecimal(reader["Precio"]);
                item.SubTotal = Convert.ToDecimal(reader["SubTotal"]);
                item.Descuento = Convert.ToDecimal(reader["Descuento"]);
                item.Total = Convert.ToDecimal(reader["Total"]);
                item.Fecha = Convert.ToDateTime(reader["Fecha"]);
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

        public VentaDespachoDTO GetDespachoVenta(int IdVenta)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT [IdDespacho] " +
                              ",ISNULL([IdVenta],0) AS IdVenta  " +
                              ",ISNULL([IdTipoDespacho],0)  AS IdTipoDespacho " +
                              ",ISNULL([Direccion],'') AS Direccion  " +
                              ",ISNULL([Numero],'') AS Numero  " +
                              ",ISNULL([Telefono],'') AS Telefono  " +
                              ",ISNULL([Email],'') AS Email  " +
                              ",ISNULL([IdEstadoDespacho],0)  AS IdEstadoDespacho " +
                              ",ISNULL([IdRegion],0) AS IdRegion  " +
                              ",ISNULL([CiuCom],'') AS CiuCom  " +
                              ",ISNULL([ComCod],'') AS ComCod " +
                              ",[FechaDespacho] " +
                              " FROM [VentaDespacho] WHERE IdVenta = " + IdVenta + "";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            VentaDespachoDTO item = new VentaDespachoDTO();
            while (reader.Read())
            {
                item.IdDespacho = (reader["IdDespacho"] != DBNull.Value) ? Convert.ToInt32(reader["IdDespacho"]) : 0;
                item.IdVenta = (reader["IdVenta"] != DBNull.Value) ? Convert.ToInt32(reader["IdVenta"]) : 0;
                item.IdTipoDespacho = (reader["IdTipoDespacho"] != DBNull.Value) ? Convert.ToInt32(reader["IdTipoDespacho"]) : 0;
                item.Direccion = (reader["Direccion"] != DBNull.Value) ? Convert.ToString(reader["Direccion"]) : "";
                item.Numero = (reader["Numero"] != DBNull.Value) ? Convert.ToString(reader["Numero"]) : "";
                item.Telefono = (reader["Telefono"] != DBNull.Value) ? Convert.ToString(reader["Telefono"]) : "";
                item.Email = (reader["Email"] != DBNull.Value) ? Convert.ToString(reader["Email"]) : "";
                item.IdEstadoDespacho = (reader["IdEstadoDespacho"] != DBNull.Value) ? Convert.ToInt32(reader["IdEstadoDespacho"]) : 0;
                item.IdRegion = (reader["IdRegion"] != DBNull.Value) ? Convert.ToInt32(reader["IdRegion"]) : 0;
                item.CiuCom = (reader["CiuCom"] != DBNull.Value) ? Convert.ToString(reader["CiuCom"]) : "";
                item.ComCod = (reader["ComCod"] != DBNull.Value) ? Convert.ToString(reader["ComCod"]) : "";
                item.FechaDespacho = (reader["FechaDespacho"] != DBNull.Value) ? Convert.ToDateTime(reader["FechaDespacho"]) : DateTime.Now;
            }
            reader.Close();
            con.Close();
            return item;
        }

        public double Save(VentaDTO venta)
        {
            double idSalida = 0;
            try
            {
                MaestroParametros mp = new MaestroParametros();
                ParametrosDTO par = mp.GetParametro("VentasWeb");
                venta.CodVendedor = par.Valor;

                con.Open();
                SqlCommand cmd = new SqlCommand("INSERT INTO [dbo].[Venta] ([FechaVenta],[RutCliente],[IdCupon],[CodVendedor],[CodEstadoVenta],[CodCondVta],[SubTotal],[Descuento],[PorcDescuento],[TotalDescuento],[Iva],[Total],[NVNumeroSoft],[EstadoSoft],[CodAuxSoft],[NvObserSoft],[IdTipoPago]) " +
                                                "VALUES (@FechaVenta,@RutCliente,@IdCupon,@CodVendedor,@CodEstadoVenta,@CodCondVta,@SubTotal,@Descuento,@PorcDescuento,@TotalDescuento,@Iva,@Total,@NVNumeroSoft,@EstadoSoft,@CodAuxSoft,@NvObserSoft,@IdTipoPago)  SELECT SCOPE_IDENTITY()");
                cmd.CommandType = CommandType.Text;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@FechaVenta", DateTime.Now);
                cmd.Parameters.AddWithValue("@RutCliente", venta.RutCliente);
                cmd.Parameters.AddWithValue("@CodVendedor", venta.CodVendedor);
                cmd.Parameters.AddWithValue("@CodEstadoVenta", venta.CodEstadoVenta);
                cmd.Parameters.AddWithValue("@CodCondVta", venta.CodCondVta);
                cmd.Parameters.AddWithValue("@SubTotal", venta.SubTotal);
                cmd.Parameters.AddWithValue("@Descuento", venta.Descuento);
                cmd.Parameters.AddWithValue("@PorcDescuento", venta.PorcDescuento);
                cmd.Parameters.AddWithValue("@TotalDescuento", venta.TotalDescuento);
                cmd.Parameters.AddWithValue("@Iva", venta.Iva);
                cmd.Parameters.AddWithValue("@Total", venta.Total);
                cmd.Parameters.AddWithValue("@NVNumeroSoft", venta.NVNumeroSoft);
                cmd.Parameters.AddWithValue("@EstadoSoft", venta.EstadoSoft);
                cmd.Parameters.AddWithValue("@CodAuxSoft", venta.CodAuxSoft);
                cmd.Parameters.AddWithValue("@NvObserSoft", venta.NvObserSoft);
                cmd.Parameters.AddWithValue("@IdTipoPago", venta.IdTipoPago);

                if (venta.IdCupon == 0)
                    cmd.Parameters.AddWithValue("@IdCupon", DBNull.Value);
                else
                    cmd.Parameters.AddWithValue("@IdCupon", venta.IdCupon);

                object obj = cmd.ExecuteScalar();
                double id = Convert.ToDouble(obj);
                idSalida = id;

                foreach (VentaDetalleDTO row in venta.Detalles)
                {
                    SqlCommand cmd2 = new SqlCommand("INSERT INTO [dbo].[VentaDetalle]([IdVenta],[CodProd],[Correlativo],[Cantidad],[Precio],[SubTotal],[Descuento],[Total],[Fecha]) " +
                                                    "VALUES (@IdVenta,@CodProd,@Correlativo,@Cantidad,@Precio,@SubTotal,@Descuento,@Total,@Fecha)");
                    cmd2.CommandType = CommandType.Text;
                    cmd2.Connection = con;
                    cmd2.Parameters.AddWithValue("@IdVenta", id);
                    cmd2.Parameters.AddWithValue("@CodProd", row.CodProducto);
                    cmd2.Parameters.AddWithValue("@Correlativo", row.Correlativo);
                    cmd2.Parameters.AddWithValue("@Cantidad", row.Cantidad);
                    cmd2.Parameters.AddWithValue("@Precio", row.Precio);
                    cmd2.Parameters.AddWithValue("@SubTotal", row.SubTotal);
                    cmd2.Parameters.AddWithValue("@Descuento", row.Descuento);
                    cmd2.Parameters.AddWithValue("@Total", row.Total);
                    cmd2.Parameters.AddWithValue("@Fecha", DateTime.Now);
                    cmd2.ExecuteNonQuery();
                }

                SqlCommand cmd3 = new SqlCommand("INSERT INTO [dbo].[VentaDespacho]([IdVenta],[IdTipoDespacho],[Direccion],[Numero],[Telefono],[Email],[IdEstadoDespacho],[IdRegion],[CiuCom],[ComCod]) " +
                                                "VALUES (@IdVenta,@IdTipoDespacho,@Direccion,@Numero,@Telefono,@Email,@IdEstadoDespacho,@IdRegion,@CiuCom,@ComCod)");
                cmd3.CommandType = CommandType.Text;
                cmd3.Connection = con;
                cmd3.Parameters.AddWithValue("@IdVenta", id);
                cmd3.Parameters.AddWithValue("@IdTipoDespacho", venta.Despacho.IdTipoDespacho);
                cmd3.Parameters.AddWithValue("@Direccion", venta.Despacho.Direccion);
                cmd3.Parameters.AddWithValue("@Numero", venta.Despacho.Numero);
                cmd3.Parameters.AddWithValue("@Telefono", venta.Despacho.Telefono);
                cmd3.Parameters.AddWithValue("@Email", venta.Despacho.Email);
                cmd3.Parameters.AddWithValue("@IdEstadoDespacho", venta.Despacho.IdEstadoDespacho);
                cmd3.Parameters.AddWithValue("@IdRegion", venta.Despacho.IdRegion);
                cmd3.Parameters.AddWithValue("@CiuCom", venta.Despacho.CiuCom);
                cmd3.Parameters.AddWithValue("@ComCod", venta.Despacho.ComCod);
                cmd3.ExecuteNonQuery();

                con.Close();
            }
            catch (Exception ex) { idSalida = - 1; }
            finally
            {
                if (con.State == ConnectionState.Open)
                    con.Close();
            }
            return idSalida;
        }

        public void ActualizaEstadoVenta(string CodEstadoVenta, int IdVenta)
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("UPDATE VENTA SET CodEstadoVenta = @CodEstadoVenta WHERE IDVENTA = @IdVenta");
                cmd.CommandType = CommandType.Text;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@IdVenta", IdVenta);
                cmd.Parameters.AddWithValue("@CodEstadoVenta", CodEstadoVenta);
                cmd.ExecuteNonQuery();
                con.Close();
            }
            catch { }
        }

        public void ActualizaNotaVenta_Venta(double NumNotaVenta, int IdVenta)
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("UPDATE VENTA SET NVNumeroSoft = @NVNumeroSoft WHERE IDVENTA = @IdVenta");
                cmd.CommandType = CommandType.Text;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@IdVenta", IdVenta);
                cmd.Parameters.AddWithValue("@NVNumeroSoft", NumNotaVenta);
                cmd.ExecuteNonQuery();
                con.Close();
            }
            catch {
                if (con.State == ConnectionState.Open)
                    con.Close();
            }
        }

        public ResponseInfo SaveLogtBK(LogTbkDTO item)
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("INSERT INTO [dbo].[Log_TBK] ([IdVenta] ,[Fecha] ,[Monto] ,[Token] ,[CodigoTbk] ,[Estado] ,[OrdenCompra]) " +
                                                "VALUES (@IdVenta, @Fecha, @Monto, @Token, @CodigoTbk, @Estado, @OrdenCompra)");
                cmd.CommandType = CommandType.Text;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@IdVenta", item.IdVenta);
                cmd.Parameters.AddWithValue("@Fecha", item.Fecha);
                cmd.Parameters.AddWithValue("@Monto", item.Monto);
                cmd.Parameters.AddWithValue("@Token", item.Token);
                cmd.Parameters.AddWithValue("@CodigoTbk", item.CodigoTbk);
                cmd.Parameters.AddWithValue("@Estado", item.Estado);
                cmd.Parameters.AddWithValue("@OrdenCompra", item.OrdenCompra);
                cmd.ExecuteNonQuery();
                con.Close();

                return ResponseInfo.CreateSuccess();
            }
            catch (Exception ex) { return ResponseInfo.CreateError("Error al grabar LOG. " + ex.Message); }
        }

        public ResponseInfo UpdateStateLogtBK(LogTbkDTO tbk)
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("UPDATE [Log_TBK] SET ESTADO = @Estado, CodigoTbk = @CodigoTbk, Token = @Token, Fecha = @Fecha  WHERE IdVenta = @IdVenta");
                cmd.CommandType = CommandType.Text;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@IdVenta", tbk.IdVenta);
                cmd.Parameters.AddWithValue("@Estado", tbk.Estado);
                cmd.Parameters.AddWithValue("@CodigoTbk", tbk.CodigoTbk);
                cmd.Parameters.AddWithValue("@Token", tbk.Token);
                cmd.Parameters.AddWithValue("@Fecha", tbk.Fecha);
                cmd.ExecuteNonQuery();
                con.Close();

                return ResponseInfo.CreateSuccess();
            }
            catch (Exception ex) { return ResponseInfo.CreateError("Error al grabar LOG. " + ex.Message); }
        }

    }
}
