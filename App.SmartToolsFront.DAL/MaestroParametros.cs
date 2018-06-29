using App.SmartToolsFront.DTO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace App.SmartToolsFront.DAL
{
    public class MaestroParametros
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString);

        public ParametrosDTO GetParametro(string nombre)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT * FROM PARAMETROS WHERE NOMBRE = '" + nombre + "'";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            ParametrosDTO item = new ParametrosDTO();
            while (reader.Read())
            {
                item.Id = Convert.ToInt32(reader["Id"]);
                item.Nombre = reader["Nombre"].ToString();
                item.Descripcion = reader["Descripcion"].ToString();
                item.Valor = reader["Valor"].ToString();
                item.Estado = Convert.ToInt32(reader["Estado"]);
            }
            reader.Close();
            con.Close();
            return item;
        }
    }
}
