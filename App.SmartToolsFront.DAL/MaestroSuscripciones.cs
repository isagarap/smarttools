using App.SmartToolsFront.DTO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace App.SmartToolsFront.DAL
{
    public class MaestroSuscripciones
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString);

        public ResponseInfo Save(SuscripcionesDTO item)
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("INSERT INTO [Suscripciones] (Email, FechaSuscripcion, Estado) " +
                                               "VALUES (@Email, @FechaSuscripcion, @Estado)");
                cmd.CommandType = CommandType.Text;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Email", item.Email);
                cmd.Parameters.AddWithValue("@FechaSuscripcion", DateTime.Now);
                cmd.Parameters.AddWithValue("@Estado", item.Estado);
                cmd.ExecuteNonQuery();
                con.Close();

                return ResponseInfo.CreateSuccess();
            }
            catch (Exception ex) { return ResponseInfo.CreateError("Error al grabar. " + ex.Message); }
        }
    }
}
