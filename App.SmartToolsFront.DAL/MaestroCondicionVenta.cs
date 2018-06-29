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
    public class MaestroCondicionVenta
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString);
        public List<CondicionVentaDTO> GetAll()
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT ISNULL(CodCondVta,'') AS CodCondVta " +
                              "   ,ISNULL(Nombre, '') AS Nombre " +
                              "    , ISNULL(Descripcion,'') AS Descripcion " +
                              "     , ISNULL(Estado,0) AS Estado " +
                              "FROM [dbo].[CondicionVenta] WHERE Estado = 1";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            List<CondicionVentaDTO> retorno = new List<CondicionVentaDTO>();
            while (reader.Read())
            {
                CondicionVentaDTO item = new CondicionVentaDTO();
                item.CodCondVta = reader["CodCondVta"].ToString();
                item.Nombre = reader["Nombre"].ToString();
                item.Descripcion = reader["Descripcion"].ToString();
                item.Estado = Convert.ToInt32(reader["Estado"]);
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

        public ResponseInfo Save(CondicionVentaDTO item)
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("INSERT INTO [dbo].[CondicionVenta](CodCondVta, Nombre, Descripcion, Estado) " +
                                                "VALUES (@CodCondVta, @Nombre, @Descripcion, @Estado)");
                cmd.CommandType = CommandType.Text;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@CodCondVta", item.CodCondVta);
                cmd.Parameters.AddWithValue("@Nombre", item.Nombre);
                cmd.Parameters.AddWithValue("@Descripcion", item.Descripcion);
                cmd.Parameters.AddWithValue("@Estado", item.Estado);
                cmd.ExecuteNonQuery();
                con.Close();

                return ResponseInfo.CreateSuccess();
            }
            catch (Exception ex) { return ResponseInfo.CreateError("Error al grabar condicion venta. " + ex.Message); }
        }
    }
}
