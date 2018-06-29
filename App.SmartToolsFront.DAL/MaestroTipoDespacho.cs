using App.SmartToolsFront.DTO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace App.SmartToolsFront.DAL
{
    public class MaestroTipoDespacho
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString);

        public List<TipoDespachoDTO> GetAll()
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = " SELECT ISNULL(T.IdTipoDespacho,0) AS IdTipoDespacho, ISNULL(T.Nombre,'') AS Nombre, ISNULL(T.Descripcion,'') AS Descripcion, ISNULL(T.Estado,0) AS Estado, ISNULL(T.MuestraDireccion,0) AS MuestraDireccion  " +
                              " FROM TIPODESPACHO T WHERE T.ESTADO = 1";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            List<TipoDespachoDTO> retorno = new List<TipoDespachoDTO>();
            while (reader.Read())
            {
                TipoDespachoDTO item = new TipoDespachoDTO();
                item.IdTipoDespacho = Convert.ToInt32(reader["IdTipoDespacho"]);                
                item.Nombre = reader["Nombre"].ToString();
                item.Descripcion = reader["Descripcion"].ToString();
                item.Estado = Convert.ToInt32(reader["Estado"]);
                item.MuestraDireccion = Convert.ToInt32(reader["MuestraDireccion"]);
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

        public TipoDespachoDTO GetById(int idTipoDespacho)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = " SELECT ISNULL(T.IdTipoDespacho,0) AS IdTipoDespacho, ISNULL(T.Nombre,'') AS Nombre, ISNULL(T.Descripcion,'') AS Descripcion, ISNULL(T.Estado,0) AS Estado, ISNULL(T.MuestraDireccion,0) AS MuestraDireccion  " +
                              " FROM TIPODESPACHO T WHERE T.ESTADO = 1 AND IdTipoDespacho = " + idTipoDespacho + "";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            TipoDespachoDTO item = new TipoDespachoDTO();
            while (reader.Read())
            {
                
                item.IdTipoDespacho = Convert.ToInt32(reader["IdTipoDespacho"]);
                item.Nombre = reader["Nombre"].ToString();
                item.Descripcion = reader["Descripcion"].ToString();
                item.Estado = Convert.ToInt32(reader["Estado"]);
                item.MuestraDireccion = Convert.ToInt32(reader["MuestraDireccion"]);
            }
            reader.Close();
            con.Close();
            return item;
        }

    }
}
