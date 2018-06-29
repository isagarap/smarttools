using App.SmartToolsFront.DTO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace App.SmartToolsFront.DAL
{
    public class MaestroCondicionVentaTipoPago
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString);
        public List<CondicionVentaTipoPagoDTO> GetAll()
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT * FROM CondicionVentaTipoPago";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            List<CondicionVentaTipoPagoDTO> retorno = new List<CondicionVentaTipoPagoDTO>();
            while (reader.Read())
            {
                CondicionVentaTipoPagoDTO item = new CondicionVentaTipoPagoDTO();
                item.CodCondVta = reader["CodCondVta"].ToString();
                item.IdCondVtaTipoPago = Convert.ToInt32(reader["IdCondVtaTipoPago"]);
                item.IdTipoPago = Convert.ToInt32(reader["IdTipoPago"]);
                item.Nombre = "";
                item.Descripcion = "";
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

        public List<CondicionVentaTipoPagoDTO> GetAllByCondVta(string CodCondVta)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT T.* " +
                              "  FROM CondicionVentaTipoPago C " +
                              "  INNER JOIN CondicionVenta V " +
                              "  ON C.CodCondVta = V.CodCondVta " +
                              "  INNER JOIN TipoPago T " +
                              "  ON T.IdTipoPago = C.IdTipoPago " +
                              "  WHERE T.Estado = 1 AND V.Estado = 1 " +
                              "  AND C.CodCondVta = '" + CodCondVta + "'";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            List<CondicionVentaTipoPagoDTO> retorno = new List<CondicionVentaTipoPagoDTO>();
            while (reader.Read())
            {
                CondicionVentaTipoPagoDTO item = new CondicionVentaTipoPagoDTO();
                item.CodCondVta = CodCondVta;
                item.IdCondVtaTipoPago = 0;
                item.IdTipoPago = Convert.ToInt32(reader["IdTipoPago"]);
                item.Nombre = reader["Nombre"].ToString();
                item.Descripcion = reader["Descripcion"].ToString();
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

    }
}
