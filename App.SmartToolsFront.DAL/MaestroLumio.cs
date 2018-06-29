using App.SmartToolsFront.DTO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace App.SmartToolsFront.DAL
{
    public class MaestroLumio
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString);

        public ResponseInfo Save(RegistroLumioDTO item)
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("INSERT INTO [dbo].[RegistroLumio] ([FechaCompra] ,[NombreEmpresaProveedora] ,[TipoDocumento] ,[NotaVenta] ,[NroSerie] ,[NombrePropietario] ,[Rut] ,[Correo]) " +
                                                "VALUES (@FechaCompra,@NombreEmpresaProveedora,@TipoDocumento,@NotaVenta,@NroSerie,@NombrePropietario,@Rut,@Correo)");
                cmd.CommandType = CommandType.Text;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@FechaCompra", item.FechaCompra);
                cmd.Parameters.AddWithValue("@NombreEmpresaProveedora", item.NombreEmpresaProveedora);
                cmd.Parameters.AddWithValue("@TipoDocumento", item.TipoDocumento);
                cmd.Parameters.AddWithValue("@NotaVenta", item.NotaVenta);
                cmd.Parameters.AddWithValue("@NroSerie", item.NroSerie);
                cmd.Parameters.AddWithValue("@NombrePropietario", item.NombrePropietario);
                cmd.Parameters.AddWithValue("@Rut", item.Rut);
                cmd.Parameters.AddWithValue("@Correo", item.Correo);
                cmd.ExecuteNonQuery();
                con.Close();

                return ResponseInfo.CreateSuccess();
            }
            catch (Exception ex) { return ResponseInfo.CreateError("Error al grabar. " + ex.Message); }
        }
    }
}
