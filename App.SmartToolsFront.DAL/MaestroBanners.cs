using App.SmartToolsFront.DTO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace App.SmartToolsFront.DAL
{
    public class MaestroBanners
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString);

        public List<BannersDTO> GetAll()
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT * FROM BANNERS WHERE ESTADO = 1";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            List<BannersDTO> retorno = new List<BannersDTO>();
            while (reader.Read())
            {
                BannersDTO item = new BannersDTO();
                item.IdBanner = Convert.ToInt32(reader["IdBanner"]);
                item.CodProd = reader["CodProd"].ToString();
                item.IdTipoBanner = Convert.ToInt32(reader["IdTipoBanner"]);
                item.Nombre = reader["Nombre"].ToString();
                item.Descripcion = reader["Descripcion"].ToString();
                item.Precio = Convert.ToDecimal(reader["Precio"]);
                item.Url = reader["Url"].ToString();
                item.Estado = Convert.ToInt32(reader["Estado"]);
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }
    }
}
