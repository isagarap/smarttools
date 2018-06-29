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
    public class MaestroClientes
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSource"].ConnectionString);
        SqlConnection conSoftland = new SqlConnection(ConfigurationManager.ConnectionStrings["BdDataSourceSoftland"].ConnectionString);

        public ClienteDTO GetCliente(string email)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT * FROM CLIENTE WHERE EMAIL = '" + email + "'";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            ClienteDTO item = new ClienteDTO();
            while (reader.Read())
            {
                item.Rut = reader["Rut"].ToString();
                item.CodAux = reader["CodAux"].ToString();
                item.NomAux = reader["NomAux"].ToString();
                item.Email = reader["Email"].ToString();
                item.Clave = reader["Clave"].ToString();
                item.CodGiro = reader["CodGiro"].ToString();
                item.CiuCod = reader["CiuCod"].ToString();
                item.ComCod = reader["ComCod"].ToString();
                item.IdRegion = Convert.ToInt32(reader["IdRegion"]);
                item.DirAux = reader["DirAux"].ToString();
                item.DirNum = reader["DirNum"].ToString();
                item.Telefono = reader["Telefono"].ToString();
                item.UserName = reader["UserName"].ToString();
                item.Password = reader["Password"].ToString();
                item.EmailDTE = reader["EmailDTE"].ToString();
                item.EsReceptorDTE = reader["EsReceptorDTE"].ToString();
                item.Estado = Convert.ToInt32(reader["Estado"]);
                item.CodLista = (reader["CodLista"] == DBNull.Value) ? "" : reader["CodLista"].ToString();
                item.CodCondVta = (reader["CodCondVta"] == DBNull.Value) ? "" : reader["CodCondVta"].ToString();
                item.EsJuridico = (reader["EsJuridico"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["EsJuridico"]);
                item.Contacto = (reader["Contacto"] == DBNull.Value) ? "" : reader["Contacto"].ToString();
            }
            reader.Close();
            con.Close();
            return item;
        }

        public ClienteDTO GetClienteByRut(string rut)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT * FROM CLIENTE WHERE Rut = '" + rut + "'";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            ClienteDTO item = new ClienteDTO();
            while (reader.Read())
            {
                item.Rut = reader["Rut"].ToString();
                item.CodAux = reader["CodAux"].ToString();
                item.NomAux = reader["NomAux"].ToString();
                item.Email = reader["Email"].ToString();
                item.Clave = reader["Clave"].ToString();
                item.CodGiro = reader["CodGiro"].ToString();
                item.CiuCod = reader["CiuCod"].ToString();
                item.ComCod = reader["ComCod"].ToString();
                item.IdRegion = Convert.ToInt32(reader["IdRegion"]);
                item.DirAux = reader["DirAux"].ToString();
                item.DirNum = reader["DirNum"].ToString();
                item.Telefono = reader["Telefono"].ToString();
                item.UserName = reader["UserName"].ToString();
                item.Password = reader["Password"].ToString();
                item.EmailDTE = reader["EmailDTE"].ToString();
                item.EsReceptorDTE = reader["EsReceptorDTE"].ToString();
                item.Estado = Convert.ToInt32(reader["Estado"]);
                item.CodLista = (reader["CodLista"] == DBNull.Value) ? "" : reader["CodLista"].ToString();
                item.CodCondVta = (reader["CodCondVta"] == DBNull.Value) ? "" : reader["CodCondVta"].ToString();
                item.EsJuridico = (reader["EsJuridico"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["EsJuridico"]);
                item.Contacto = (reader["Contacto"] == DBNull.Value) ? "" : reader["Contacto"].ToString();
            }
            reader.Close();
            con.Close();
            return item;
        }

        public ResponseInfo Save(ClienteDTO item)
        {
            try
            {
                //valida si el cliente es receptor dte
                item.EsReceptorDTE = "N";
                ClienteDTE cDTE = this.GetClienteDTE(item.Rut.Replace(".",""));
                if(cDTE != null && cDTE.Rut != null)
                {
                    item.EsReceptorDTE = "S";
                    item.EmailDTE = cDTE.Mail;
                }

                //recupera el contacto desde softland
                List<ClienteSoftlandDTO> clienteSl = this.GetClientFromSoftland(item.Rut);
                if (clienteSl.Count > 0)
                    item.Contacto = clienteSl[0].NombreContacto;
                else
                    item.Contacto = string.Empty;


                con.Open();
                SqlCommand cmd = new SqlCommand("INSERT INTO [dbo].[Cliente]([Rut],[CodAux],[NomAux],[Email],[Clave],[CodGiro],[CiuCod],[ComCod],[IdRegion],[DirAux],[DirNum],[Telefono],[UserName],[Password],[EmailDTE],[EsReceptorDTE],[Estado],[CodLista],[CodCondVta],[EsJuridico],[Contacto],[EsSoftland]) " +
                                                "VALUES (@Rut,@CodAux,@NomAux,@Email,@Clave,@CodGiro,@CiuCod,@ComCod,@IdRegion,@DirAux,@DirNum,@Telefono,@UserName,@Password,@EmailDTE,@EsReceptorDTE,@Estado,@CodLista,@CodCondVta,@EsJuridico,@Contacto,@EsSoftland)");
                cmd.CommandType = CommandType.Text;
                cmd.Connection = con;

                string[] aux = item.Rut.Replace(".", "").Split('-');
                item.CodAux = aux[0];

                cmd.Parameters.AddWithValue("@Rut", item.Rut);
                cmd.Parameters.AddWithValue("@CodAux", item.CodAux);
                cmd.Parameters.AddWithValue("@NomAux", item.NomAux);
                cmd.Parameters.AddWithValue("@Email", item.Email);
                cmd.Parameters.AddWithValue("@Clave", item.Clave);
                cmd.Parameters.AddWithValue("@CiuCod", item.CiuCod);
                cmd.Parameters.AddWithValue("@ComCod", item.ComCod);
                cmd.Parameters.AddWithValue("@IdRegion", item.IdRegion);
                cmd.Parameters.AddWithValue("@DirAux", item.DirAux);
                cmd.Parameters.AddWithValue("@DirNum", item.DirNum);
                cmd.Parameters.AddWithValue("@Telefono", item.Telefono);
                cmd.Parameters.AddWithValue("@UserName", item.UserName);
                cmd.Parameters.AddWithValue("@Password", item.Password);
                cmd.Parameters.AddWithValue("@Estado", item.Estado);
                cmd.Parameters.AddWithValue("@EsJuridico", item.EsJuridico);
                cmd.Parameters.AddWithValue("@EmailDTE", item.EmailDTE);
                cmd.Parameters.AddWithValue("@EsReceptorDTE", item.EsReceptorDTE);
                cmd.Parameters.AddWithValue("@Contacto", item.Contacto);
                cmd.Parameters.AddWithValue("@EsSoftland", (item.ExisteEnSoftland == true) ? 1 : 0);

                MaestroParametros mp = new MaestroParametros();
                ParametrosDTO p1 = mp.GetParametro("ListaPreciosDefecto");
                ParametrosDTO p2 = mp.GetParametro("CondicionPagoDefecto");
                ParametrosDTO p3 = mp.GetParametro("GiroParticular");

                if (!item.ExisteEnSoftland)
                {
                    cmd.Parameters.AddWithValue("@CodLista", p1.Valor);
                    cmd.Parameters.AddWithValue("@CodCondVta", p2.Valor);
                    cmd.Parameters.AddWithValue("@CodGiro", p3.Valor);

                    item.CodLista = p1.Valor;
                    item.CodCondVta = p2.Valor;
                    item.CodGiro = p3.Valor;
                }
                else
                {
                    string codLista = this.GetListaClienteSoftland(item.Rut);
                    string codCondVta = this.GetCondVentaClienteSoftland(item.Rut);

                    cmd.Parameters.AddWithValue("@CodLista", (codLista.Trim() == "") ? p1.Valor : codLista);
                    cmd.Parameters.AddWithValue("@CodCondVta", (codCondVta.Trim() == "") ? p2.Valor : codCondVta);
                    cmd.Parameters.AddWithValue("@CodGiro", item.CodGiro);
                }

                cmd.ExecuteNonQuery();
                con.Close();

                if (!item.ExisteEnSoftland)
                {
                    ResponseInfo s1 = this.SaveClienteSoftland(item);

                    ClienteContactoDTO cc = new ClienteContactoDTO
                    {
                        CodAuc = item.CodAux,
                        NomCon = item.NomAux,
                        CarCon = "02",
                        FonCon = item.Telefono,
                        FonCon2 = "",
                        FonCon3 = "",
                        Email = item.Email,
                        Usuario = null,
                        Proceso = null,
                        FechaUlMod = DateTime.Now
                    };

                    ResponseInfo s2 = this.SaveContactoClienteSoftland(cc);

                    ClienteCondVtaListPreciosDTO clp = new ClienteCondVtaListPreciosDTO
                    {
                        CodAux = item.CodAux,
                        CodVen = "07",
                        ConVta = item.CodCondVta,
                        MtoCre = 0,
                        CatCli = "03",
                        CodZon = null,
                        CodCan = "03",
                        CodCob = null,
                        DirCob = null,
                        ComCob = null,
                        CiuCob = null,
                        PaiCob = null,
                        FonCob = item.Telefono,
                        DiaPag = null,
                        CodLista = item.CodLista,
                        Usuario = "WEB",
                        Proceso = "Ficha Cliente ERP",
                        FechaUlMod = DateTime.Now,
                        Sistema = null
                    };

                    ResponseInfo s3 = this.SaveCondVtaListPreciosSoftland(clp);
                }

                return ResponseInfo.CreateSuccess();
            }
            catch (Exception ex) { return ResponseInfo.CreateError("Error al grabar. " + ex.Message); }
        }

        public ResponseInfo SaveClienteSoftland(ClienteDTO cliente)
        {
            try
            {
                conSoftland.Open();
                SqlCommand cmd = new SqlCommand("INSERT INTO " +
                                            "softland.cwtauxi " +
                                            "(CodAux, NomAux, NoFAux, RutAux, ActAux, GirAux, ComAux, CiuAux, PaiAux, DirAux, DirNum, FonAux1, FonAux2, FonAux3, ClaCli, Bloqueado, EMail, WebSite, Region, ClienteDesde, eMailDTE, esReceptorDTE, Usuario, Proceso, FechaUlMod) " +
                                            "VALUES " +
                                            "(@CodAux, @NomAux, @NoFAux, @RutAux, @ActAux, @GirAux, @ComAux, @CiuAux, @PaiAux, @DirAux, @DirNum, @FonAux1, @FonAux2, @FonAux3, @ClaCli, @Bloqueado, @EMail, @WebSite, @Region, @ClienteDesde, @eMailDTE, @esReceptorDTE, @Usuario, @Proceso, @FechaUlMod)");

                cmd.CommandType = CommandType.Text;
                cmd.Connection = conSoftland;
                cmd.Parameters.AddWithValue("@CodAux", cliente.CodAux);
                cmd.Parameters.AddWithValue("@NomAux", cliente.NomAux);
                cmd.Parameters.AddWithValue("@NoFAux", cliente.NomAux);
                cmd.Parameters.AddWithValue("@RutAux", cliente.Rut);
                cmd.Parameters.AddWithValue("@ActAux", "S");
                cmd.Parameters.AddWithValue("@GirAux", cliente.CodGiro);
                cmd.Parameters.AddWithValue("@ComAux", cliente.ComCod); 
                cmd.Parameters.AddWithValue("@CiuAux", cliente.CiuCod); 
                cmd.Parameters.AddWithValue("@PaiAux", "CL");
                cmd.Parameters.AddWithValue("@DirAux", cliente.DirAux);
                cmd.Parameters.AddWithValue("@DirNum", cliente.DirNum);
                cmd.Parameters.AddWithValue("@FonAux1", cliente.Telefono);
                cmd.Parameters.AddWithValue("@FonAux2", DBNull.Value);
                cmd.Parameters.AddWithValue("@FonAux3", DBNull.Value);
                cmd.Parameters.AddWithValue("@ClaCli", "S");
                cmd.Parameters.AddWithValue("@Bloqueado", "N");
                cmd.Parameters.AddWithValue("@EMail", cliente.Email);
                cmd.Parameters.AddWithValue("@WebSite", DBNull.Value);
                cmd.Parameters.AddWithValue("@Region", cliente.IdRegion);
                cmd.Parameters.AddWithValue("@ClienteDesde", DateTime.Now);
                cmd.Parameters.AddWithValue("@eMailDTE", cliente.EmailDTE);
                cmd.Parameters.AddWithValue("@esReceptorDTE", cliente.EsReceptorDTE);
                cmd.Parameters.AddWithValue("@Usuario", "WEB");
                cmd.Parameters.AddWithValue("@Proceso", "Ficha Auxiliar");
                cmd.Parameters.AddWithValue("@FechaUlMod", DateTime.Now);

                cmd.ExecuteNonQuery();
                conSoftland.Close();

                return ResponseInfo.CreateSuccess();
            }
            catch (Exception ex) { return ResponseInfo.CreateError("Error al grabar. " + ex.Message); }
        }

        public ResponseInfo SaveContactoClienteSoftland(ClienteContactoDTO cliente)
        {
            try
            {
                conSoftland.Open();
                SqlCommand cmd = new SqlCommand("INSERT INTO softland.cwtaxco( CodAuc,NomCon,CarCon,FonCon,FonCon2,FonCon3,Email,Usuario,Proceso,FechaUlMod) " +
                                                "VALUES(@CodAuc, @NomCon, @CarCon, @FonCon, @FonCon2, @FonCon3, @Email, @Usuario, @Proceso, @FechaUlMod)");

                cmd.CommandType = CommandType.Text;
                cmd.Connection = conSoftland;
                cmd.Parameters.AddWithValue("@CodAuc", cliente.CodAuc);
                cmd.Parameters.AddWithValue("@NomCon", cliente.NomCon);
                cmd.Parameters.AddWithValue("@CarCon", "03"); // cliente.CarCon);
                cmd.Parameters.AddWithValue("@FonCon", cliente.FonCon);
                cmd.Parameters.AddWithValue("@FonCon2", DBNull.Value);
                cmd.Parameters.AddWithValue("@FonCon3", DBNull.Value);
                cmd.Parameters.AddWithValue("@Email", cliente.Email);
                cmd.Parameters.AddWithValue("@Usuario", DBNull.Value);
                cmd.Parameters.AddWithValue("@Proceso", DBNull.Value);
                cmd.Parameters.AddWithValue("@FechaUlMod", DBNull.Value);
                cmd.ExecuteNonQuery();
                conSoftland.Close();

                return ResponseInfo.CreateSuccess();
            }
            catch (Exception ex) { return ResponseInfo.CreateError("Error al grabar. " + ex.Message); }
        }

        public ResponseInfo SaveCondVtaListPreciosSoftland(ClienteCondVtaListPreciosDTO cliente)
        {
            try
            {
                conSoftland.Open();
                SqlCommand cmd = new SqlCommand("INSERT INTO [softland].[cwtcvcl] ([CodAux] ,[CodVen] ,[ConVta] ,[MtoCre] ,[CatCli] ,[CodZon],[CodCan] ,[CodCob] ,[DirCob] ,[ComCob] ,[CiuCob] ,[PaiCob] ,[FonCob] ,[DiaPag] ,[CodLista] ,[Usuario] ,[Proceso] ,[FechaUlMod] ,[Sistema]) " +
                                                "VALUES (@CodAux , @CodVen , @ConVta , @MtoCre , @CatCli , @CodZon, @CodCan , @CodCob , @DirCob , @ComCob , @CiuCob , @PaiCob , @FonCob , @DiaPag , @CodLista , @Usuario , @Proceso , @FechaUlMod , @Sistema)");
                cmd.CommandType = CommandType.Text;
                cmd.Connection = conSoftland;
                cmd.Parameters.AddWithValue("@CodAux", cliente.CodAux);
                cmd.Parameters.AddWithValue("@CodVen", cliente.CodVen);
                cmd.Parameters.AddWithValue("@ConVta", cliente.ConVta);
                cmd.Parameters.AddWithValue("@MtoCre", cliente.MtoCre);
                cmd.Parameters.AddWithValue("@CatCli", cliente.CatCli);
                cmd.Parameters.AddWithValue("@CodZon", DBNull.Value);
                cmd.Parameters.AddWithValue("@CodCan", cliente.CodCan);
                cmd.Parameters.AddWithValue("@CodCob", DBNull.Value);
                cmd.Parameters.AddWithValue("@DirCob", DBNull.Value);
                cmd.Parameters.AddWithValue("@ComCob", DBNull.Value);
                cmd.Parameters.AddWithValue("@CiuCob", DBNull.Value);
                cmd.Parameters.AddWithValue("@PaiCob", DBNull.Value);
                cmd.Parameters.AddWithValue("@FonCob", cliente.FonCob);
                cmd.Parameters.AddWithValue("@DiaPag", DBNull.Value);
                cmd.Parameters.AddWithValue("@CodLista", cliente.CodLista);
                cmd.Parameters.AddWithValue("@Usuario", cliente.Usuario);
                cmd.Parameters.AddWithValue("@Proceso", cliente.Proceso);
                cmd.Parameters.AddWithValue("@FechaUlMod", DateTime.Now);
                cmd.Parameters.AddWithValue("@Sistema", DBNull.Value);
                cmd.ExecuteNonQuery();
                conSoftland.Close();

                return ResponseInfo.CreateSuccess();
            }
            catch (Exception ex) { return ResponseInfo.CreateError("Error al grabar. " + ex.Message); }
        }

        public List<ClienteSoftlandDTO> GetClientFromSoftland(string rut)
        {
            conSoftland.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT  top 1 softland.cwtauxi.CodAux, softland.cwtauxi.NomAux AS Cliente, softland.cwtauxi.RutAux AS Rut, softland.cwtgiro.GirDes AS Giro, softland.cwtcomu.ComDes AS Comuna, " +
                              "                       softland.cwtciud.CiuDes AS Ciudad, softland.cwtpais.PaiDes AS Pais, softland.cwtauxi.DirAux AS Direccion, softland.cwtauxi.DirNum AS DirNum, softland.cwtauxi.FonAux1 AS Fono,  " +
                              "                      softland.cwtauxi.Bloqueado, softland.cwtregion.Descripcion AS Region, softland.cwtauxi.EMail, softland.cwtauxi.esReceptorDTE, softland.cwtauxi.eMailDTE " +
                              "                      ,isnull((select top 1 GirAux from softland.cwtauxi where RutAux = '" + rut + "'),'') as GirAux " +
                              "                      ,case when softland.cwtaxco.NomCon is null then softland.cwtauxi.NomAux else softland.cwtaxco.NomCon end as nombreContacto " +
                              "FROM softland.cwtauxi LEFT OUTER JOIN " +
                              "                      softland.cwtcomu ON softland.cwtauxi.ComAux = softland.cwtcomu.ComCod LEFT OUTER JOIN " +
                              "                      softland.cwtgiro ON softland.cwtauxi.GirAux = softland.cwtgiro.GirCod LEFT OUTER JOIN " +
                              "                      softland.cwtregion ON softland.cwtauxi.Region = softland.cwtregion.id_Region LEFT OUTER JOIN " +
                              "                      softland.cwtciud ON softland.cwtauxi.CiuAux = softland.cwtciud.CiuCod LEFT OUTER JOIN " +
                              "                      softland.cwtpais ON softland.cwtauxi.PaiAux = softland.cwtpais.PaiCod " +
                              "                      LEFT OUTER JOIN softland.cwtaxco ON softland.cwtaxco.CodAuc = softland.cwtauxi.CodAux " +
                              "WHERE (softland.cwtauxi.ActAux = 'S') AND (softland.cwtauxi.ClaCli = 'S') AND (softland.cwtauxi.RutAux = '" + rut + "')";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = conSoftland;
            reader = cmd.ExecuteReader();

            List<ClienteSoftlandDTO> retorno = new List<ClienteSoftlandDTO>();
            while (reader.Read())
            {
                ClienteSoftlandDTO item = new ClienteSoftlandDTO();
                item.CodAux = (reader["CodAux"] != DBNull.Value) ? reader["CodAux"].ToString() : string.Empty;
                item.Cliente = (reader["Cliente"] != DBNull.Value) ? reader["Cliente"].ToString() : string.Empty;
                item.Rut = (reader["Rut"] != DBNull.Value) ? reader["Rut"].ToString() : string.Empty;
                item.Giro = (reader["Giro"] != DBNull.Value) ? reader["Giro"].ToString() : string.Empty;
                item.Comuna = (reader["Comuna"] != DBNull.Value) ? reader["Comuna"].ToString() : string.Empty;
                item.Ciudad = (reader["Ciudad"] != DBNull.Value) ? reader["Ciudad"].ToString() : string.Empty;
                item.Pais = (reader["Pais"] != DBNull.Value) ? reader["Pais"].ToString() : string.Empty;
                item.Direccion = (reader["Direccion"] != DBNull.Value) ? reader["Direccion"].ToString() : string.Empty;
                item.DirNum = (reader["DirNum"] != DBNull.Value) ? reader["DirNum"].ToString() : string.Empty;
                item.Fono = (reader["Fono"] != DBNull.Value) ? reader["Fono"].ToString() : string.Empty;
                item.Bloqueado = (reader["Bloqueado"] != DBNull.Value) ? reader["Bloqueado"].ToString() : string.Empty;
                item.Region = (reader["Region"] != DBNull.Value) ? reader["Region"].ToString() : string.Empty;
                item.Email = (reader["Email"] != DBNull.Value) ? reader["Email"].ToString() : string.Empty;
                item.esReceptorDTE = (reader["esReceptorDTE"] != DBNull.Value) ? reader["esReceptorDTE"].ToString() : string.Empty;
                item.eMailDTE = (reader["eMailDTE"] != DBNull.Value) ? reader["eMailDTE"].ToString() : string.Empty;
                item.GirAux = (reader["GirAux"] != DBNull.Value) ? reader["GirAux"].ToString() : string.Empty;
                item.NombreContacto = (reader["nombreContacto"] != DBNull.Value) ? reader["nombreContacto"].ToString() : string.Empty;
                retorno.Add(item);
            }
            reader.Close();
            conSoftland.Close();
            return retorno;
        }

        public string GetCondVentaClienteSoftland(string rut)
        {
            string outC = string.Empty;
            try
            {
                conSoftland.Open();

                SqlCommand cmd = new SqlCommand();
                SqlDataReader reader;
                cmd.CommandText = "SELECT     softland.cwtcvcl.ConVta " +
                                  "FROM softland.cwtcvcl LEFT OUTER JOIN softland.cwtauxi ON softland.cwtcvcl.CodAux = softland.cwtauxi.CodAux " +
                                  "WHERE(softland.cwtauxi.RutAux = '" + rut + "')";
                cmd.CommandType = CommandType.Text;
                cmd.Connection = conSoftland;
                reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    outC = (reader["ConVta"] != DBNull.Value) ? reader["ConVta"].ToString() : string.Empty;
                }
                reader.Close();
                conSoftland.Close();
            }
            catch { }
            return outC;
        }

        public string GetListaClienteSoftland(string rut)
        {
            string outC = string.Empty;
            try
            {
                conSoftland.Open();

                SqlCommand cmd = new SqlCommand();
                SqlDataReader reader;
                cmd.CommandText = "SELECT  softland.cwtcvcl.CodLista " +
                                  " FROM softland.cwtcvcl LEFT OUTER JOIN " +
                                  " softland.cwtauxi ON softland.cwtcvcl.CodAux = softland.cwtauxi.CodAux " +
                                  " WHERE(softland.cwtauxi.RutAux = '" + rut + "')";
                cmd.CommandType = CommandType.Text;
                cmd.Connection = conSoftland;
                reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    outC = (reader["CodLista"] != DBNull.Value) ? reader["CodLista"].ToString() : string.Empty;
                }
                reader.Close();
                conSoftland.Close();
            }
            catch { }
            return outC;
        }

        public ResponseInfo UpdatePassword(string NewPass, string Email)
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("UPDATE CLIENTE SET CLAVE = @NewPass WHERE EMAIL = @Email");
                cmd.CommandType = CommandType.Text;
                cmd.Connection = con;
                cmd.Parameters.AddWithValue("@NewPass", NewPass);
                cmd.Parameters.AddWithValue("@Email", Email);
                cmd.ExecuteNonQuery();
                con.Close();

                return ResponseInfo.CreateSuccess();
            }
            catch (Exception ex) { return ResponseInfo.CreateError("Error al grabar. " + ex.Message); }
        }

        public ClienteDTE GetClienteDTE(string rut)
        {
            con.Open();

            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;
            cmd.CommandText = "SELECT * FROM CSV_EmpresasSii WHERE Rut = '" + rut + "'";
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            reader = cmd.ExecuteReader();

            ClienteDTE item = new ClienteDTE();
            while (reader.Read())
            {
                item.Rut = reader["Rut"].ToString();
                item.RazonSocial = (reader["RazonSocial"] == DBNull.Value) ? "" : reader["RazonSocial"].ToString();
                item.NroResolucion = (reader["NroResolucion"] == DBNull.Value) ? 0 : Convert.ToInt32(reader["NroResolucion"]);
                item.FechaResolucion = (reader["FechaResolucion"] == DBNull.Value) ? DateTime.Now : Convert.ToDateTime(reader["FechaResolucion"]);
                item.Mail = (reader["Mail"] == DBNull.Value) ? "" : reader["Mail"].ToString();
                item.Url = (reader["Url"] == DBNull.Value) ? "" : reader["Url"].ToString();
                item.FechaCarga = (reader["FechaCarga"] == DBNull.Value) ? DateTime.Now : Convert.ToDateTime(reader["FechaCarga"]);
            }
            reader.Close();
            con.Close();
            return item;
        }

    }
}

