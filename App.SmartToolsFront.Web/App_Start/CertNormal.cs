using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.SmartToolsFront.Web.App_Start
{
    public class CertNormal
    {
        internal static Dictionary<string, string> certificate()
        {

            /** Crea un Dictionary para almacenar los datos de integración pruebas */
            Dictionary<string, string> certificate = new Dictionary<string, string>();

            /** Agregar datos de integración a Dictionary */
            String certFolder = System.Web.HttpContext.Current.Server.MapPath("~/Uploads/Transbank");

            /** Modo de Utilización */
            certificate.Add("environment", "PRODUCCION");

            /** Certificado Publico (Dirección fisica de certificado o contenido) */
            certificate.Add("public_cert", certFolder + "\\certificates\\597033567197\\tbk.pem");

            /** Ejemplo de Ruta de Certificado de Salida */
            certificate.Add("webpay_cert", certFolder + "\\certificates\\597033567197\\597033567197.pfx");

            /** Ejemplo de Password de Certificado de Salida */
            certificate.Add("password", "adminprod");

            /** Codigo Comercio */
            certificate.Add("commerce_code", "597033567197");

            return certificate;

        }
    }
}