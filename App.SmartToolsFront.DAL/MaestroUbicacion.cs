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
    public class MaestroUbicacion
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString);

        public List<RegionDTO> GetAllRegiones()
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT * FROM REGION";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            List<RegionDTO> retorno = new List<RegionDTO>();
            while (reader.Read())
            {
                RegionDTO item = new RegionDTO();
                item.IdRegion = (reader["IdRegion"] != DBNull.Value) ? Convert.ToInt32(reader["IdRegion"]) : 0;
                item.Descripcion = (reader["Descripcion"] != DBNull.Value) ? reader["Descripcion"].ToString() : string.Empty;
                item.Estado = (reader["Estado"] != DBNull.Value) ? Convert.ToInt32(reader["Estado"]) : 0;
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

        public List<CiudadDTO> GetAllCiudades()
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT * FROM CIUDAD";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            List<CiudadDTO> retorno = new List<CiudadDTO>();
            while (reader.Read())
            {
                CiudadDTO item = new CiudadDTO();
                item.CiuCod = (reader["CiuCod"] != DBNull.Value) ? reader["CiuCod"].ToString() : string.Empty;
                item.Descripcion = (reader["Descripcion"] != DBNull.Value) ? reader["Descripcion"].ToString() : string.Empty;
                item.IdRegion = (reader["IdRegion"] != DBNull.Value) ? Convert.ToInt32(reader["IdRegion"]) : 0;
                item.CodPostal = (reader["CodPostal"] != DBNull.Value) ? Convert.ToInt32(reader["CodPostal"]) : 0;
                item.Estado = (reader["Estado"] != DBNull.Value) ? reader["Estado"].ToString() : string.Empty;
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

        public List<ComunaDTO> GetAllComunas()
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT * FROM COMUNA";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            List<ComunaDTO> retorno = new List<ComunaDTO>();
            while (reader.Read())
            {
                ComunaDTO item = new ComunaDTO();
                item.ComCod = (reader["ComCod"] != DBNull.Value) ? reader["ComCod"].ToString() : string.Empty;
                item.Descripcion = (reader["Descripcion"] != DBNull.Value) ? reader["Descripcion"].ToString() : string.Empty;
                item.Id_Region = (reader["Id_Region"] != DBNull.Value) ? Convert.ToInt32(reader["Id_Region"]) : 0;
                item.Estado = (reader["Estado"] != DBNull.Value) ? Convert.ToInt32(reader["Estado"]) : 0;
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

        public UbicacionDTO GetUbicacion(string email)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT " +
                              "    r.IdRegion,r.Descripcion as Region, " +
                              "    ci.CiuCod,ci.Descripcion as Ciudad, " +
                              "    com.ComCod,com.Descripcion as Comuna " +
                              "FROM Cliente C " +
                              "INNER JOIN REGION R " +
                              "ON R.IdRegion = C.IdRegion " +
                              "INNER JOIN Ciudad CI " +
                              "ON CI.CiuCod = C.CiuCod " +
                              "INNER JOIN COMUNA COM " +
                              "ON COM.ComCod = C.ComCod " +
                              "WHERE C.Email = '" + email + "'";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            UbicacionDTO item = new UbicacionDTO();
            while (reader.Read())
            {
                item.Region = new RegionDTO { IdRegion = Convert.ToInt32(reader["IdRegion"]), Descripcion = reader["Region"].ToString() };
                item.Ciudad = new CiudadDTO { CiuCod = reader["CiuCod"].ToString(), Descripcion = reader["Ciudad"].ToString() };
                item.Comuna = new ComunaDTO { ComCod = reader["ComCod"].ToString(), Descripcion = reader["Comuna"].ToString() };
            }
            reader.Close();
            con.Close();
            return item;
        }

    }
}
