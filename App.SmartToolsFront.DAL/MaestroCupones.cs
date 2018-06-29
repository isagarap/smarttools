using App.SmartToolsFront.DTO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace App.SmartToolsFront.DAL
{
    public class MaestroCupones
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString);

        public List<CuponesDTO> GetAll()
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "select * from Cupones where Estado = 1";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            List<CuponesDTO> retorno = new List<CuponesDTO>();
            while (reader.Read())
            {
                CuponesDTO item = new CuponesDTO();
                item.IdCupon = Convert.ToInt32(reader["IdCupon"]);
                item.Nombre = reader["Nombre"].ToString();
                item.Descripcion = reader["Descripcion"].ToString();
                item.IdTipoCupon = Convert.ToInt32(reader["IdTipoCupon"]);
                item.IdTipoDescuento = Convert.ToInt32(reader["IdTipoDescuento"]);
                item.Descuento = Convert.ToDecimal(reader["Estado"]);
                item.Estado = Convert.ToInt32(reader["Estado"]);
                item.CodProd = reader["CodProd"].ToString();
                item.Codigo = reader["Codigo"].ToString();
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

        public CuponesDTO Get(int IdCupon)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "select * from Cupones where IdCupon = " + IdCupon + "";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            CuponesDTO item = new CuponesDTO();
            while (reader.Read())
            {
                item.IdCupon = Convert.ToInt32(reader["IdCupon"]);
                item.Nombre = reader["Nombre"].ToString();
                item.Descripcion = reader["Descripcion"].ToString();
                item.IdTipoCupon = Convert.ToInt32(reader["IdTipoCupon"]);
                item.IdTipoDescuento = Convert.ToInt32(reader["IdTipoDescuento"]);
                item.Descuento = Convert.ToDecimal(reader["Estado"]);
                item.Estado = Convert.ToInt32(reader["Estado"]);
                item.CodProd = reader["CodProd"].ToString();
                item.Codigo = reader["Codigo"].ToString();
            }
            reader.Close();
            con.Close();
            return item;
        }

        public CuponesDTO Get(string Codigo)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "select * from Cupones where Codigo = '" + Codigo + "'";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            CuponesDTO item = new CuponesDTO();
            while (reader.Read())
            {
                item.IdCupon = Convert.ToInt32(reader["IdCupon"]);
                item.Nombre = reader["Nombre"].ToString();
                item.Descripcion = reader["Descripcion"].ToString();
                item.IdTipoCupon = Convert.ToInt32(reader["IdTipoCupon"]);
                item.IdTipoDescuento = Convert.ToInt32(reader["IdTipoDescuento"]);
                item.Descuento = Convert.ToDecimal(reader["Estado"]);
                item.Estado = Convert.ToInt32(reader["Estado"]);
                item.CodProd = reader["CodProd"].ToString();
                item.Codigo = reader["Codigo"].ToString();
            }
            reader.Close();
            con.Close();
            return item;
        }

    }
}
