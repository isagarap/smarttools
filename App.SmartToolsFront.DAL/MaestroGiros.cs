using App.SmartToolsFront.DTO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;


namespace App.SmartToolsFront.DAL
{
    public class MaestroGiros
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString);

        public List<GiroDTO> GetAll()
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT * FROM GIRO WHERE ESTADO = 1";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            List<GiroDTO> retorno = new List<GiroDTO>();
            while (reader.Read())
            {
                GiroDTO item = new GiroDTO();
                item.IdGiro = reader["IdGiro"].ToString();
                item.Nombre = reader["Nombre"].ToString();
                item.Estado = Convert.ToInt32(reader["Estado"]);
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }
    }
}
