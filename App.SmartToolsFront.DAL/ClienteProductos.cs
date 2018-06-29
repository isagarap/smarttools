using App.SmartToolsFront.DTO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace App.SmartToolsFront.DAL
{
    public class ClienteProductos
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString);

        public List<ProductosDTO> GetAllByClient(string email)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "Select P.*, " +
                              "ISNULL(C.Cantidad, 0) AS Cantidad, ISNULL((SELECT TOP 1 ISNULL(Path, '') " +
                              "FROM ProductosImagenes I WHERE I.CodProd = P.CodProd),'')  AS Path " +
                              "from[dbo].[ClienteProductos] C " +
                              "INNER JOIN Productos P ON C.CodProducto = P.CodProd " +
                              "AND C.CodProducto = P.CodProd WHERE C.Email = '" + email + "'";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            List<ProductosDTO> retorno = new List<ProductosDTO>();
            while (reader.Read())
            {
                ProductosDTO item = new ProductosDTO();
                item.CodProd = reader["CodProd"].ToString();
                item.DesProd = reader["DesProd"].ToString();
                item.DesProd2 = reader["DesProd2"].ToString();
                item.CodBarra = reader["CodBarra"].ToString();
                item.CodUmed = reader["CodUmed"].ToString();
                item.CodCategoria = reader["CodCategoria"].ToString();
                item.CodSubCatergoria = reader["CodSubCatergoria"].ToString();
                item.PrecioVta = Convert.ToDecimal(reader["PrecioVta"]);
                item.PrecioBoleta = Convert.ToDecimal(reader["PrecioBoleta"]);
                item.PesoKgs = Convert.ToDecimal(reader["PesoKgs"]);
                item.ImagenDefault = new ProductosImagenes { Path = reader["Path"].ToString(), Activa = -1 };
                item.Cantidad = Convert.ToInt32(reader["Cantidad"]);
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

        public ResponseInfo Save(ClienteProductosDTO item)
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("INSERT INTO [dbo].[ClienteProductos] ([CodProducto] ,[Cantidad] ,[Precio] ,[Fecha] ,[Estado] ,[RutCliente] ,[CodAux], [Email]) VALUES " +
                                                "(@CodProducto, @Cantidad, @Precio, @Fecha, @Estado, @RutCliente, @CodAux, @Email)");
                cmd.CommandType = CommandType.Text;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@CodProd", item.CodProducto);
                cmd.Parameters.AddWithValue("@Cantidad", item.Cantidad);
                cmd.Parameters.AddWithValue("@Precio", item.Precio);
                cmd.Parameters.AddWithValue("@Fecha", DateTime.Now);
                cmd.Parameters.AddWithValue("@Estado", item.Estado);
                cmd.Parameters.AddWithValue("@RutCliente", item.RutCliente);
                cmd.Parameters.AddWithValue("@CodAux", item.CodAux);
                cmd.Parameters.AddWithValue("@Email", item.Email);
                cmd.ExecuteNonQuery();
                con.Close();

                return ResponseInfo.CreateSuccess();
            }
            catch (Exception ex) { return ResponseInfo.CreateError("Error al grabar. " + ex.Message); }
        }

        public ResponseInfo Delete(string email, string CodProducto)
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("DELETE FROM ClienteProductos WHERE Email = @Email AND CodProducto = @CodProducto");
                cmd.CommandType = CommandType.Text;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@Email", email);
                cmd.Parameters.AddWithValue("@CodProducto", CodProducto);
                cmd.ExecuteNonQuery();
                con.Close();

                return ResponseInfo.CreateSuccess();
            }
            catch (Exception ex) { return ResponseInfo.CreateError("Error al grabar. " + ex.Message); }
        }
    }
}
