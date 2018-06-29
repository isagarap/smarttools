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
    public class MaestroProductos
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString);
        SqlConnection conSoftland = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSourceSoftland"].ConnectionString);
        public List<ProductosDTO> GetAll()
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT P.*, ISNULL(PIMG.Path,'') AS Path " +
                              "FROM Productos P " +
                              "LEFT JOIN PRODUCTOSIMAGENES PIMG " +
                              "ON P.CodProd = PIMG.CodProducto  WHERE P.ESTADO = 1";
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
                item.CodSubCatergoria = ""; // reader["CodSubCatergoria"].ToString();
                item.PrecioVta = Convert.ToDecimal(reader["PrecioVta"]);
                item.PrecioBoleta = Convert.ToDecimal(reader["PrecioBoleta"]);
                item.PesoKgs = Convert.ToDecimal(reader["PesoKgs"]);
                item.ImagenDefault = new ProductosImagenes { Path = reader["Path"].ToString(), Activa = 1 };
                item.Imagenes = this.GetImagesFromProduct(item.CodProd);
                item.ProductoDestacado = (reader["ProductoDestacado"] == DBNull.Value) ? "N" : reader["ProductoDestacado"].ToString(); ;
                item.OrdenDestacado = (reader["OrdenDestacado"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["OrdenDestacado"]);
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

        public List<ProductosDTO> GetAllOneImage(string codLista)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT  " + "\n" +
                             "    P.CodProd,   " + "\n" +
                             "    P.DesProd,   " + "\n" +
                             "    P.DesProd2,   " + "\n" +
                             "    P.CodBarra,   " + "\n" +
                             "    P.CodUmed,   " + "\n" +
                             "    P.CodCategoria,   " + "\n" +
                             "    ISNULL(P.PrecioBoleta,0) AS PrecioBoleta,  " + "\n" +
                             "    ISNULL(P.PesoKgs,0) AS PesoKgs,  " + "\n" +
                             "    P.Estado,   " + "\n" +
                             "    P.ProductoDestacado,   " + "\n" +
                             "    P.OrdenDestacado,   " + "\n" +
                             "    P.Fecha_Carga_Soft,   " + "\n" +
                             "    ISNULL(C.DESGRUPO, '') AS NombreCategoria,  " + "\n" +
                             "    ISNULL((SELECT top 1 ISNULL(Path, '') FROM ProductosImagenes I WHERE I.CodProd = P.CodProd),'')  AS Path,  " + "\n" +
                             "    CASE WHEN  " + "\n" +
                             "        (SELECT COUNT(*) FROM PrecioProductos WHERE CodProd = P.CODPROD AND CodLista = '005') > 0  " + "\n" +
                             "    THEN ISNULL(PP.Valor,0) + round(((ISNULL(PP.Valor,0) * CAST((SELECT TOP 1 VALOR FROM Parametros WHERE UPPER(NOMBRE) = 'IVA') AS int)) / 100),0)  " + "\n" +
                             "    ELSE  " + "\n" +
                             "  " + "\n" +
                             "        ISNULL(P.PrecioVta,0) + round(((ISNULL(P.PrecioVta,0) * CAST((SELECT TOP 1 VALOR FROM Parametros WHERE UPPER(NOMBRE) = 'IVA') AS int)) / 100),0)  " + "\n" +
                             "    END AS PrecioVta  " + "\n" +
                             "FROM Productos P  " + "\n" +
                             "LEFT JOIN CATEGORIA C  " + "\n" +
                             "ON C.CODGRUPO = P.CODCATEGORIA  " + "\n" +
                             "LEFT JOIN PrecioProductos PP  " + "\n" +
                             "ON PP.CodProd = P.CodProd  " + "\n" +
                             "AND PP.CodLista = '" + codLista + "'  " + "\n" +
                             "WHERE P.ESTADO = 1";
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
                item.CodSubCatergoria = ""; // reader["CodSubCatergoria"].ToString();
                item.PrecioVta = Convert.ToDecimal(reader["PrecioVta"]);
                item.PrecioBoleta = Convert.ToDecimal(reader["PrecioBoleta"]);
                item.PesoKgs = Convert.ToDecimal(reader["PesoKgs"]);
                item.Estado = Convert.ToInt32(reader["Estado"]);
                item.NombreCategoria = reader["NombreCategoria"].ToString();
                item.ImagenDefault = new ProductosImagenes { Path = reader["Path"].ToString(), Activa = 1 };
                item.ProductoDestacado = (reader["ProductoDestacado"] == DBNull.Value) ? "N" : reader["ProductoDestacado"].ToString(); ;
                item.OrdenDestacado = (reader["OrdenDestacado"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["OrdenDestacado"]);
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

        public List<ProductosDTO> GetProductoAsList(string CodProducto)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT P.*, ISNULL(PIMG.Path,'') AS Path " +
                              "FROM Productos P " +
                              "LEFT JOIN PRODUCTOSIMAGENES PIMG " +
                              "ON P.CodProd = PIMG.CodProducto " +
                              "WHERE CodProducto = '" + CodProducto + "' AND PIMG.ACTIVA = 1  AND P.ESTADO = 1";
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
                item.CodSubCatergoria = ""; // reader["CodSubCatergoria"].ToString();
                item.PrecioVta = Convert.ToDecimal(reader["PrecioVta"]);
                item.PrecioBoleta = Convert.ToDecimal(reader["PrecioBoleta"]);
                item.PesoKgs = Convert.ToDecimal(reader["PesoKgs"]);
                item.Estado = Convert.ToInt32(reader["Estado"]);
                item.ImagenDefault = new ProductosImagenes { Path = reader["Path"].ToString(), Activa = 1 };
                item.Imagenes = this.GetImagesFromProduct(item.CodProd);
                item.ProductoDestacado = (reader["ProductoDestacado"] == DBNull.Value) ? "N" : reader["ProductoDestacado"].ToString(); ;
                item.OrdenDestacado = (reader["OrdenDestacado"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["OrdenDestacado"]);
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

        public ProductosDTO GetProducto(int id)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT P.*, ISNULL(PIMG.Path,'') AS Path " +
                              "FROM Productos P " +
                              "LEFT JOIN PRODUCTOSIMAGENES PIMG " +
                              "ON P.CodProd = PIMG.CodProducto " +
                              "WHERE ID = " + id + " AND PIMG.ACTIVA = 1  AND P.ESTADO = 1";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            ProductosDTO item = new ProductosDTO();
            while (reader.Read())
            {
                item.CodProd = reader["CodProd"].ToString();
                item.DesProd = reader["DesProd"].ToString();
                item.DesProd2 = reader["DesProd2"].ToString();
                item.CodBarra = reader["CodBarra"].ToString();
                item.CodUmed = reader["CodUmed"].ToString();
                item.CodCategoria = reader["CodCategoria"].ToString();
                item.CodSubCatergoria = ""; // reader["CodSubCatergoria"].ToString();
                item.PrecioVta = Convert.ToDecimal(reader["PrecioVta"]);
                item.PrecioBoleta = Convert.ToDecimal(reader["PrecioBoleta"]);
                item.PesoKgs = Convert.ToDecimal(reader["PesoKgs"]);
                item.Estado = Convert.ToInt32(reader["Estado"]);
                item.ImagenDefault = new ProductosImagenes { Path = reader["Path"].ToString() };
                item.Imagenes = this.GetImagesFromProduct(item.CodProd);
                item.ProductoDestacado = (reader["ProductoDestacado"] == DBNull.Value) ? "N" : reader["ProductoDestacado"].ToString(); ;
                item.OrdenDestacado = (reader["OrdenDestacado"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["OrdenDestacado"]);
            }
            reader.Close();
            con.Close();
            return item;
        }

        public ProductosDTO GetProductoByCodigo(string codigo)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT P.* , ISNULL(C.DesGrupo,'') AS NombreCategoria, " +
                              "  ISNULL((SELECT TOP 1 PATH FROM PRODUCTOSIMAGENES PP WHERE PP.CodProd = P.CODPROD),'') AS Path " +
                              " FROM Productos P LEFT JOIN CATEGORIA C " +
                              " ON C.CodGrupo = P.CodCategoria" +
                              " WHERE CODPROD = '" + codigo + "' AND P.ESTADO = 1";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            ProductosDTO item = new ProductosDTO();
            while (reader.Read())
            {
                item.CodProd = reader["CodProd"].ToString();
                item.DesProd = reader["DesProd"].ToString();
                item.DesProd2 = reader["DesProd2"].ToString();
                item.CodBarra = reader["CodBarra"].ToString();
                item.CodUmed = reader["CodUmed"].ToString();
                item.CodCategoria = reader["CodCategoria"].ToString();
                item.CodSubCatergoria = ""; // reader["CodSubCatergoria"].ToString();
                item.PrecioVta = Convert.ToDecimal(reader["PrecioVta"]);
                item.PrecioBoleta = Convert.ToDecimal(reader["PrecioBoleta"]);
                item.PesoKgs = Convert.ToDecimal(reader["PesoKgs"]);
                item.Estado = Convert.ToInt32(reader["Estado"]);
                item.ImagenDefault = new ProductosImagenes { Path = reader["Path"].ToString() };
                item.Imagenes = this.GetImagesFromProduct(item.CodProd);
                item.NombreCategoria = reader["NombreCategoria"].ToString();
                item.ProductoDestacado = (reader["ProductoDestacado"] == DBNull.Value) ? "N" : reader["ProductoDestacado"].ToString(); ;
                item.OrdenDestacado = (reader["OrdenDestacado"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["OrdenDestacado"]);
            }
            reader.Close();
            con.Close();
            return item;
        }

        public List<ProductosImagenes> GetImagesFromProduct(string CodProducto)
        {
            List<ProductosImagenes> retorno = new List<ProductosImagenes>();
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString))
            {
                con.Open();
                using (SqlCommand command = new SqlCommand("select * from productosimagenes where activa = 1 and CodProd = '" + CodProducto + "'", con))
                {
                    using (SqlDataReader readerr = command.ExecuteReader())
                    {
                        while (readerr.Read())
                        {
                            ProductosImagenes item = new ProductosImagenes();
                            item.IdProductoImagen = Convert.ToInt32(readerr["IdProductoImagen"]);
                            item.CodProd = readerr["CodProd"].ToString();
                            item.Path = readerr["Path"].ToString();
                            item.Activa = Convert.ToInt32(readerr["Activa"]);
                            retorno.Add(item);
                        }
                    }
                }
                if (con.State == ConnectionState.Open) { con.Close(); }              
            }
            return retorno;
        }

        public List<ProductosDTO> GetAllOneImageSearch(string valueSearch, string codLista)
        {
            con.Open();

            string sql = "SELECT  " + "\n" +
                        "   P.CodProd,   " + "\n" +
                        "   P.DesProd,   " + "\n" +
                        "   P.DesProd2,   " + "\n" +
                        "   P.CodBarra,   " + "\n" +
                        "   P.CodUmed,   " + "\n" +
                        "   P.CodCategoria,   " + "\n" +
                        "   ISNULL(P.PrecioBoleta,0) AS PrecioBoleta,  " + "\n" +
                        "   ISNULL(P.PesoKgs,0) AS PesoKgs,  " + "\n" +
                        "   P.Estado,   " + "\n" +
                        "   P.ProductoDestacado,   " + "\n" +
                        "   P.OrdenDestacado,   " + "\n" +
                        "   P.Fecha_Carga_Soft,   " + "\n" +
                        "   ISNULL(C.DESGRUPO, '') AS NombreCategoria,  " + "\n" +
                        "    ISNULL((SELECT top 1 ISNULL(Path, '') FROM ProductosImagenes I WHERE I.CodProd = P.CodProd),'')  AS Path,  " + "\n" +
                        "    CASE WHEN  " + "\n" +
                        "        (SELECT COUNT(*) FROM PrecioProductos WHERE CodProd = P.CODPROD AND CodLista = '" + codLista + "') > 0  " + "\n" +
                        "   THEN ISNULL(PP.Valor, 0) +round(((ISNULL(PP.Valor, 0) * CAST((SELECT TOP 1 VALOR FROM Parametros WHERE UPPER(NOMBRE) = 'IVA') AS int)) / 100),0)  " + "\n" +
                        "   ELSE  " + "\n" +
                        "       ISNULL(P.PrecioVta, 0) + round(((ISNULL(P.PrecioVta, 0) * CAST((SELECT TOP 1 VALOR FROM Parametros WHERE UPPER(NOMBRE) = 'IVA') AS int)) / 100),0)  " + "\n" +
                        "   END AS PrecioVta  " + "\n" +
                        "FROM Productos P  " + "\n" +
                        "LEFT JOIN CATEGORIA C  " + "\n" +
                        "ON C.CODGRUPO = P.CODCATEGORIA  " + "\n" +
                        "LEFT JOIN PrecioProductos PP  " + "\n" +
                        "ON PP.CodProd = P.CodProd  " + "\n" +
                        "AND PP.CodLista = '" + codLista + "'  " + "\n" +
                        "WHERE P.ESTADO = 1";

            if (!String.IsNullOrEmpty(valueSearch) && valueSearch != "all")
            {
                valueSearch = valueSearch.ToUpper().Trim();
                sql = sql + " AND UPPER(P.DesProd)LIKE '%" + valueSearch + "%' OR UPPER(P.DesProd) LIKE '%" + valueSearch + "%' " +
                            "OR UPPER(P.CodProd) LIKE '%" + valueSearch + "%' OR UPPER(P.DesProd) LIKE '%" + valueSearch + "%' " +
                            "OR UPPER(C.DesGrupo) LIKE '%" + valueSearch + "%' OR UPPER(P.CodBarra) LIKE '%" + valueSearch + "%'"; 
            }

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = sql;
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
                item.CodSubCatergoria = ""; // reader["CodSubCatergoria"].ToString();
                item.PrecioVta = Convert.ToDecimal(reader["PrecioVta"]);
                item.PrecioBoleta = Convert.ToDecimal(reader["PrecioBoleta"]);
                item.PesoKgs = Convert.ToDecimal(reader["PesoKgs"]);
                item.Estado = Convert.ToInt32(reader["Estado"]);
                item.ImagenDefault = new ProductosImagenes { Path = reader["Path"].ToString(), Activa = 1 };
                item.NombreCategoria = reader["NombreCategoria"].ToString();
                item.ProductoDestacado = (reader["ProductoDestacado"] == DBNull.Value) ? "N" : reader["ProductoDestacado"].ToString(); ;
                item.OrdenDestacado = (reader["OrdenDestacado"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["OrdenDestacado"]);
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

        public List<ProductosDTO> GetAllOneImageSearchWithFilter(string valueSearch, string filters, string codLista)
        {
            con.Open();

            string sql = "SELECT  " + "\n" +
                        "   P.CodProd,   " + "\n" +
                        "   P.DesProd,   " + "\n" +
                        "   P.DesProd2,   " + "\n" +
                        "   P.CodBarra,   " + "\n" +
                        "   P.CodUmed,   " + "\n" +
                        "   P.CodCategoria,   " + "\n" +
                        "   ISNULL(P.PrecioBoleta,0) AS PrecioBoleta,  " + "\n" +
                        "   ISNULL(P.PesoKgs,0) AS PesoKgs,  " + "\n" +
                        "   P.Estado,   " + "\n" +
                        "   P.ProductoDestacado,   " + "\n" +
                        "   P.OrdenDestacado,   " + "\n" +
                        "   P.Fecha_Carga_Soft,   " + "\n" +
                        "   ISNULL(C.DESGRUPO, '') AS NombreCategoria,  " + "\n" +
                        "    ISNULL((SELECT top 1 ISNULL(Path, '') FROM ProductosImagenes I WHERE I.CodProd = P.CodProd),'')  AS Path,  " + "\n" +
                        "    CASE WHEN  " + "\n" +
                        "        (SELECT COUNT(*) FROM PrecioProductos WHERE CodProd = P.CODPROD AND CodLista = '" + codLista +"') > 0  " + "\n" +
                        "   THEN ISNULL(PP.Valor, 0) +round(((ISNULL(PP.Valor, 0) * CAST((SELECT TOP 1 VALOR FROM Parametros WHERE UPPER(NOMBRE) = 'IVA') AS int)) / 100),0)  " + "\n" +
                        "   ELSE  " + "\n" +
                        "       ISNULL(P.PrecioVta, 0) + round(((ISNULL(P.PrecioVta, 0) * CAST((SELECT TOP 1 VALOR FROM Parametros WHERE UPPER(NOMBRE) = 'IVA') AS int)) / 100),0)  " + "\n" +
                        "   END AS PrecioVta  " + "\n" +
                        "FROM Productos P  " + "\n" +
                        "LEFT JOIN CATEGORIA C  " + "\n" +
                        "ON C.CODGRUPO = P.CODCATEGORIA  " + "\n" +
                        "LEFT JOIN PrecioProductos PP  " + "\n" +
                        "ON PP.CodProd = P.CodProd  " + "\n" +
                        "AND PP.CodLista = '" + codLista + "'  " + "\n" +
                        "WHERE P.ESTADO = 1";

            if (!String.IsNullOrEmpty(valueSearch) && valueSearch != "all")
            {
                valueSearch = valueSearch.ToUpper().Trim();
                sql = sql + " AND (UPPER(P.DesProd)LIKE '%" + valueSearch + "%' OR UPPER(P.DesProd) LIKE '%" + valueSearch + "%' " +
                            "OR UPPER(P.CodProd) LIKE '%" + valueSearch + "%' OR UPPER(P.DesProd) LIKE '%" + valueSearch + "%' " +
                            "OR UPPER(C.DesGrupo) LIKE '%" + valueSearch + "%' OR UPPER(P.CodBarra) LIKE '%" + valueSearch + "%') ";
            }

            if (!String.IsNullOrEmpty(filters))
                sql = sql + " AND C.CodGrupo IN (" + filters + ")";

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = sql;
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
                item.CodSubCatergoria = ""; // reader["CodSubCatergoria"].ToString();
                item.PrecioVta = Convert.ToDecimal(reader["PrecioVta"]);
                item.PrecioBoleta = Convert.ToDecimal(reader["PrecioBoleta"]);
                item.PesoKgs = Convert.ToDecimal(reader["PesoKgs"]);
                item.Estado = Convert.ToInt32(reader["Estado"]);
                item.ImagenDefault = new ProductosImagenes { Path = reader["Path"].ToString(), Activa = 1 };
                item.NombreCategoria = reader["NombreCategoria"].ToString();
                item.ProductoDestacado = (reader["ProductoDestacado"] == DBNull.Value) ? "N" : reader["ProductoDestacado"].ToString(); ;
                item.OrdenDestacado = (reader["OrdenDestacado"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["OrdenDestacado"]);
                retorno.Add(item);
            }
            reader.Close();
            con.Close();
            return retorno;
        }

        public ProductoDetalleDTO GetProductoForDetalleByCodigo(string codigo, string codLista)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT " + "\n" +
                            "   P.CodProd,  " + "\n" +
                            "   P.DesProd,  " + "\n" +
                            "   P.DesProd2,  " + "\n" +
                            "   P.CodBarra,  " + "\n" +
                            "   P.CodUmed,  " + "\n" +
                            "   P.CodCategoria,  " + "\n" +
                            "   P.PrecioBoleta,  " + "\n" +
                            "   P.PesoKgs,  " + "\n" +
                            "   P.Estado,  " + "\n" +
                            "   P.ProductoDestacado,  " + "\n" +
                            "   P.OrdenDestacado,  " + "\n" +
                            "   P.Fecha_Carga_Soft,  " + "\n" +
                            "   ISNULL(C.DESGRUPO, '') AS NombreCategoria, " + "\n" +
                            "    ISNULL((SELECT top 1 ISNULL(Path, '') FROM ProductosImagenes I WHERE I.CodProd = P.CodProd),'')  AS Path, " + "\n" +
                            "    CASE WHEN " + "\n" +
                            "        (SELECT COUNT(*) FROM PrecioProductos WHERE CodProd = P.CODPROD AND CodLista = '" + codLista + "') > 0 " + "\n" +
                            "   THEN ISNULL(PP.Valor,0) + round(((ISNULL(PP.Valor,0) * CAST((SELECT TOP 1 VALOR FROM Parametros WHERE UPPER(NOMBRE) = 'IVA') AS int)) / 100),0) " + "\n" +
                            "   ELSE " + "\n" +
                            "       ISNULL(P.PrecioVta,0) + round(((ISNULL(P.PrecioVta,0) * CAST((SELECT TOP 1 VALOR FROM Parametros WHERE UPPER(NOMBRE) = 'IVA') AS int)) / 100),0) " + "\n" +
                            "   END AS PrecioVta " + "\n" +
                            "FROM Productos P " + "\n" +
                            "LEFT JOIN CATEGORIA C " + "\n" +
                            "ON C.CODGRUPO = P.CODCATEGORIA " + "\n" +
                            "LEFT JOIN PrecioProductos PP " + "\n" +
                            "ON PP.CodProd = P.CodProd " + "\n" +
                            "AND PP.CodLista = '" + codLista + "' " + "\n" +
                            "WHERE P.ESTADO = 1 AND p.CodProd = '" + codigo + "'";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            ProductoDetalleDTO item = new ProductoDetalleDTO();
            while (reader.Read())
            {                
                item.CodProd = reader["CodProd"].ToString();
                item.DesProd = reader["DesProd"].ToString();
                item.DesProd2 = reader["DesProd2"].ToString();
                item.CodBarra = reader["CodBarra"].ToString();
                item.CodUmed = reader["CodUmed"].ToString();
                item.CodCategoria = reader["CodCategoria"].ToString();
                item.CodSubCatergoria = ""; // reader["CodSubCatergoria"].ToString();
                item.PrecioVta = Convert.ToDecimal(reader["PrecioVta"]);
                item.PrecioBoleta = Convert.ToDecimal(reader["PrecioBoleta"]);
                item.PesoKgs = Convert.ToDecimal(reader["PesoKgs"]);
                item.Estado = Convert.ToInt32(reader["Estado"]);
                item.ImagenDefault = new ProductosImagenes { Path = reader["Path"].ToString() };
                item.Imagenes = this.GetImagesFromProduct(item.CodProd);
                item.NombreCategoria = reader["NombreCategoria"].ToString();
                item.ProductosRelacionados = this.GetAllOneImage2(item.CodProd, item.CodCategoria, codLista);
                item.ProductoDestacado = (reader["ProductoDestacado"] == DBNull.Value) ? "N" : reader["ProductoDestacado"].ToString(); ;
                item.OrdenDestacado = (reader["OrdenDestacado"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["OrdenDestacado"]);
                item.FichasProducto = this.GetFichaProducto(item.CodProd);
            }
            reader.Close();
            con.Close();
            return item;
        }

        public List<ProductosDTO> GetAllOneImage2(string codProducto, string codCategoria, string codLista)
        {
            List<ProductosDTO> retorno = new List<ProductosDTO>();
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString))
            {
                con.Open();
                using (SqlCommand command = new SqlCommand("SELECT " + "\n" +
                                                           "P.CodProd, " + "\n" +
                                                           "P.DesProd, " + "\n" +
                                                           "P.DesProd2, " + "\n" +
                                                           "P.CodBarra, " + "\n" +
                                                           "P.CodUmed, " + "\n" +
                                                           "P.CodCategoria, " + "\n" +
                                                           "ISNULL(P.PrecioBoleta,0) AS PrecioBoleta,  " + "\n" +
                                                           "ISNULL(P.PesoKgs,0) AS PesoKgs,  " + "\n" +
                                                           "P.Estado, " + "\n" +
                                                           "P.ProductoDestacado, " + "\n" +
                                                           "P.OrdenDestacado, " + "\n" +
                                                           "P.Fecha_Carga_Soft, " + "\n" +
                                                           "ISNULL(C.DESGRUPO, '') AS NombreCategoria, " + "\n" +
                                                           "ISNULL((SELECT top 1 ISNULL(Path, '') FROM ProductosImagenes I WHERE I.CodProd = P.CodProd), '')  AS Path, " + "\n" +
                                                           " CASE WHEN " + "\n" +
                                                           "     (SELECT COUNT(*) FROM PrecioProductos WHERE CodProd = P.CODPROD AND CodLista = '" + codLista + "') > 0 " + "\n" +
                                                           "THEN ISNULL(PP.Valor, 0) +round(((ISNULL(PP.Valor, 0) * CAST((SELECT TOP 1 VALOR FROM Parametros WHERE UPPER(NOMBRE) = 'IVA') AS int)) / 100),0) " + "\n" +
                                                           "ELSE " + "\n" +
                                                           "    ISNULL(P.PrecioVta, 0) + round(((ISNULL(P.PrecioVta, 0) * CAST((SELECT TOP 1 VALOR FROM Parametros WHERE UPPER(NOMBRE) = 'IVA') AS int)) / 100),0) " + "\n" +
                                                           "END AS PrecioVta " + "\n" +
                                                        "FROM Productos P " + "\n" +
                                                        "LEFT JOIN CATEGORIA C " + "\n" +
                                                        "ON C.CODGRUPO = P.CODCATEGORIA " + "\n" +
                                                        "LEFT JOIN PrecioProductos PP " + "\n" +
                                                        "ON PP.CodProd = P.CodProd " + "\n" +
                                                        "AND PP.CodLista = '" + codLista + "' " + "\n" +
                                                        "WHERE P.ESTADO = 1 " + "\n" +
                                                        "AND P.CodCategoria = '" + codCategoria + "' " + "\n" +
                                                        "AND P.CODPROD != '" + codProducto + "'", con))
                {
                    using (SqlDataReader readerr = command.ExecuteReader())
                    {
                        while (readerr.Read())
                        {
                            ProductosDTO item = new ProductosDTO();
                            item.CodProd = readerr["CodProd"].ToString();
                            item.DesProd = readerr["DesProd"].ToString();
                            item.DesProd2 = readerr["DesProd2"].ToString();
                            item.CodBarra = readerr["CodBarra"].ToString();
                            item.CodUmed = readerr["CodUmed"].ToString();
                            item.CodCategoria = readerr["CodCategoria"].ToString();
                            item.CodSubCatergoria = ""; // readerr["CodSubCatergoria"].ToString();
                            item.PrecioVta = Convert.ToDecimal(readerr["PrecioVta"]);
                            item.PrecioBoleta = Convert.ToDecimal(readerr["PrecioBoleta"]);
                            item.PesoKgs = Convert.ToDecimal(readerr["PesoKgs"]);
                            item.Estado = Convert.ToInt32(readerr["Estado"]);
                            item.NombreCategoria = readerr["NombreCategoria"].ToString();
                            item.ImagenDefault = new ProductosImagenes { Path = readerr["Path"].ToString(), Activa = 1 };
                            item.ProductoDestacado = (readerr["ProductoDestacado"] == DBNull.Value) ? "N" : readerr["ProductoDestacado"].ToString(); ;
                            item.OrdenDestacado = (readerr["OrdenDestacado"] == DBNull.Value) ? 0 : Convert.ToInt32(readerr["OrdenDestacado"]);
                            retorno.Add(item);
                        }
                    }
                }
                if (con.State == ConnectionState.Open) { con.Close(); }
            }
            return retorno;
        }

        public List<FichaProductoDTO> GetFichaProducto(string codProducto)
        {
            List<FichaProductoDTO> retorno = new List<FichaProductoDTO>();
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString))
            {
                con.Open();
                using (SqlCommand command = new SqlCommand("SELECT * FROM FICHAPRODUCTO WHERE CODPROD = '" + codProducto + "' AND ESTADO = 1", con))
                {
                    using (SqlDataReader readerr = command.ExecuteReader())
                    {
                        while (readerr.Read())
                        {
                            FichaProductoDTO item = new FichaProductoDTO();
                            item.idFicha = Convert.ToInt32(readerr["idFicha"]);
                            item.CodProd = readerr["CodProd"].ToString();
                            item.Ficha = readerr["Ficha"].ToString();
                            item.Estado = Convert.ToInt32(readerr["Estado"]);
                            retorno.Add(item);
                        }
                    }
                }
                if (con.State == ConnectionState.Open) { con.Close(); }
            }
            return retorno;
        }

        public double GetStockProducto(string codproducto)
        {
            double stock = 0;
            try
            {
                conSoftland.Open();

                SqlCommand cmd = new SqlCommand();
                SqlDataReader reader;
                //cmd.CommandText = " SELECT (Sum (Ingresos - Egresos)) AS Stock " +
                //                  " FROM softland.IW_vsnpMovimStockTipoBod WITH (INDEX(IW_GMOVI_BodPro)) " +
                //                  " WHERE   Fecha <= GETDATE() AND CodProd = '" + codproducto + "'";
                cmd.CommandText = "SELECT     (SELECT     CONVERT(INT, SUM(MS.Ingresos - MS.Egresos)) AS Stock " +
                                  "    FROM softland.IW_MovimStock AS MS INNER JOIN " +
                                  "                           softland.iw_tprod AS TP ON MS.CodProd = TP.CodProd " +
                                  "    WHERE(TP.CodProd = '" +  codproducto +"') AND(MS.Tipo <> 'C')) - " +
                                  "ISNULL((SELECT     SUM(b.nvCant - (CASE WHEN(isnull(b.nvcantdesp, 0) - isnull(nvcantdevuelto, 0)) > b.nvcant THEN b.nvcant ELSE(isnull(b.nvcantdesp, 0) " +
                                  "                         - isnull(nvcantdevuelto, 0)) END)) AS saldo " +
                                  "         FROM softland.nw_nventa AS n WITH (NOLOCK)INNER JOIN " +
                                  "                       softland.cwtauxi AS c WITH(NOLOCK) ON c.CodAux = n.CodAux INNER JOIN " +
                                  "                       softland.NW_vsnpDetNV AS b ON b.NVNumero = n.NVNumero " +
                                  "WHERE(n.nvEstado IN('A', 'C')) AND(n.ConcManual = 'N') AND(n.nvFem <= CONVERT(datetime, GETDATE(), 103)) AND(n.nvFem >= CONVERT(datetime, " +
                                  "                           (SELECT     FechaStockComprometido " +
                                  "                             FROM          softland.nwparam), 103)) AND(b.CodProd = '" + codproducto + "')),0) AS Disponible";
                cmd.CommandType = CommandType.Text;
                cmd.Connection = conSoftland;
                reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    stock = (reader[0] == DBNull.Value) ? 0 : Convert.ToDouble(reader[0]); 
                }

                reader.Close();
                conSoftland.Close();
            }
            catch { }
            return stock;
        }

    }
}
