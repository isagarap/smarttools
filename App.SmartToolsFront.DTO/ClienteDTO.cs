using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.SmartToolsFront.DTO
{
    public class ClienteDTO
    {
        public string Rut { get; set; }
        public string CodAux { get; set; }
        public string NomAux { get; set; }
        public string Email { get; set; }
        public string Clave { get; set; }
        public string CodGiro { get; set; }
        public string CiuCod { get; set; }
        public string ComCod { get; set; }
        public int IdRegion { get; set; }
        public string DirAux { get; set; }
        public string DirNum { get; set; }
        public string Telefono { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string EmailDTE { get; set; }
        public string EsReceptorDTE { get; set; }
        public int Estado { get; set; }
        public string CodLista { get; set; }
        public string CodCondVta { get; set; }
        public int EsJuridico { get; set; }
        public string Contacto { get; set; }
        public Boolean ExisteEnSoftland { get; set; }
    }

    public class ClienteSoftlandDTO
    {
        public string CodAux { get; set; }
        public string Cliente { get; set; }
        public string Rut { get; set; }
        public string Giro { get; set; }
        public string Comuna { get; set; }
        public string Ciudad { get; set; }
        public string Pais { get; set; }
        public string Direccion { get; set; }
        public string DirNum { get; set; }
        public string Fono { get; set; }
        public string Bloqueado { get; set; }
        public string Region { get; set; }
        public string Email { get; set; }
        public string esReceptorDTE { get; set; }
        public string eMailDTE { get; set; }
        public string GirAux { get; set; }
        public string NombreContacto { get; set; }
    }

    public class ClienteContactoDTO
    {
        public string CodAuc { get; set; }
        public string NomCon { get; set; }
        public string CarCon { get; set; }
        public string FonCon { get; set; }
        public string FonCon2 { get; set; }
        public string FonCon3 { get; set; }
        public string Email { get; set; }
        public string Usuario { get; set; }
        public string Proceso { get; set; }
        public DateTime FechaUlMod { get; set; }
    }

    public class ClienteCondVtaListPreciosDTO
    {
        public string CodAux { get; set; }
        public string CodVen { get; set; }
        public string ConVta { get; set; }
        public decimal MtoCre { get; set; }
        public string CatCli { get; set; }
        public string CodZon { get; set; }
        public string CodCan { get; set; }
        public string CodCob { get; set; }
        public string DirCob { get; set; }
        public string ComCob { get; set; }
        public string CiuCob { get; set; }
        public string PaiCob { get; set; }
        public string FonCob { get; set; }
        public string DiaPag { get; set; }
        public string CodLista { get; set; }
        public string Usuario { get; set; }
        public string Proceso { get; set; }
        public DateTime FechaUlMod { get; set; }
        public string Sistema { get; set; }
    }

    public class ClienteDTE
    {
        public string Rut { get; set; }
        public string RazonSocial { get; set; }
        public int NroResolucion { get; set; }
        public DateTime FechaResolucion { get; set; }
        public string Mail { get; set; }
        public string Url { get; set; }
        public DateTime FechaCarga { get; set; }
    }

}
