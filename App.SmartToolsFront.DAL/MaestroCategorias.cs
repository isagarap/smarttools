using App.SmartToolsFront.DTO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace App.SmartToolsFront.DAL
{
    public class MaestroCategorias
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString);
        public List<CategoriasDTO> GetAll()
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "select c.*, (select count(*) as Cantidad from Productos p where p.CodCategoria = c.CodGrupo) as Cantidad from Categoria c where c.Estado = 1";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            List<CategoriasDTO> retorno = new List<CategoriasDTO>();
            while (reader.Read())
            {
                CategoriasDTO item = new CategoriasDTO();
                item.Id = Convert.ToInt32(reader["Id"]);
                item.CodGrupo = reader["CodGrupo"].ToString();
                item.DesGrupo = reader["DesGrupo"].ToString();
                item.Imagen = reader["Imagen"].ToString();
                item.Estado = Convert.ToInt32(reader["Estado"]);
                item.Cantidad = Convert.ToInt32(reader["Cantidad"]);
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

        public List<CategoriasDTO> GetAllForMenu()
        {
            SqlCommand command;
            DataTable dt = new DataTable();
            SqlDataAdapter adapter = new SqlDataAdapter();
            List<CategoriasDTO> retorno = new List<CategoriasDTO>();

            string cantidadPorColumna = ConfigurationManager.AppSettings["CANT_CATEGORIAS_X_COLUMNA_MENU"];
            if (cantidadPorColumna == null)
                cantidadPorColumna = "7";

            int indiceSalida = Convert.ToInt32(cantidadPorColumna) * 3;

            try
            {
                con.Open();
                command = new SqlCommand("Select TOP " + indiceSalida + " * from Categoria c where c.Estado = 1 order by DesGrupo", con);
                adapter.SelectCommand = command;
                adapter.Fill(dt);
                adapter.Dispose();
                command.Dispose();
                con.Close();

                int i = 1;
                int index = 1;
                int cantidad = 1;
                

                foreach (DataRow drow in dt.Rows)
                {
                    CategoriasDTO item = new CategoriasDTO();
                    if (i == indiceSalida)
                    {
                        item.Id = 0;
                        item.CodGrupo = "";
                        item.DesGrupo = "Todas las Categorías";
                        item.Imagen = "";
                        item.Estado = 1;
                        item.Cantidad = 4;
                        retorno.Add(item);
                        break;
                    }
                    else
                    {
                        item.Id = Convert.ToInt32(drow["Id"]);
                        item.CodGrupo = drow["CodGrupo"].ToString();
                        item.DesGrupo = drow["DesGrupo"].ToString();
                        item.Imagen = drow["Imagen"].ToString();
                        item.Estado = Convert.ToInt32(drow["Estado"]);
                        item.Cantidad = cantidad;
                        retorno.Add(item);

                        if (index == Convert.ToInt32(cantidadPorColumna))
                        {
                            index = 1;
                            cantidad = cantidad + 1;
                        }
                        else
                            index = index + 1;

                        i = i + 1;
                        
                    }                    
                }
            }
            catch { }

            return retorno;

            //con.Open();

            //string cantidadPorColumna = ConfigurationManager.AppSettings["CANT_CATEGORIAS_X_COLUMNA_MENU"];
            //if (cantidadPorColumna == null)
            //    cantidadPorColumna = "10";

            //SqlCommand cmd = new SqlCommand();
            //SqlDataReader reader;
            //cmd.CommandText = "Select C.* , ROW_NUMBER() OVER(ORDER BY Codgrupo) as Cantidad from Categoria c where c.Estado = 1 order by DesGrupo";
            //cmd.CommandType = CommandType.Text;
            //cmd.Connection = con;
            //reader = cmd.ExecuteReader();

            //int index = 1;
            //int cantidad = 1;

            //List<CategoriasDTO> retorno = new List<CategoriasDTO>();
            //while (reader.Read())
            //{
            //    CategoriasDTO item = new CategoriasDTO();
                
            //    if(Convert.ToInt32(reader["Cantidad"]) == 40)
            //    {

            //    }

            //    if (index == 40)
            //    {
            //        item.Id = 0;
            //        item.CodGrupo = "";
            //        item.DesGrupo = "Todas las Categorías";
            //        item.Imagen = "";
            //        item.Estado = 1;
            //        item.Cantidad = cantidad;
            //        retorno.Add(item);
            //        break;
            //    }
            //    else
            //    {
            //        item.Id = Convert.ToInt32(reader["Id"]);
            //        item.CodGrupo = reader["CodGrupo"].ToString();
            //        item.DesGrupo = reader["DesGrupo"].ToString();
            //        item.Imagen = reader["Imagen"].ToString();
            //        item.Estado = Convert.ToInt32(reader["Estado"]);
            //        item.Cantidad = cantidad;
            //        index = index + 1;
            //        retorno.Add(item);

            //        if (index == Convert.ToInt32(cantidadPorColumna))
            //        {
            //            index = 1;
            //            cantidad = cantidad + 1;
            //        }
            //    }                
            //}
            //reader.Close();
            //con.Close();
            //return retorno;
        }

    }
}
