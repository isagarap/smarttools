using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.AgroComercio.Web.Uploads.Transbank
{
    public class CertNormal
    {
        internal static Dictionary<string, string> certificate()
        {

            /** Crea un Dictionary para almacenar los datos de integración pruebas */
            Dictionary<string, string> certificate = new Dictionary<string, string>();

            /** Agregar datos de integración a Dictionary */

            //String certFolder = System.Web.HttpContext.Current.Server.MapPath("~/Uploads/Transbank");

            string certFolder = System.Configuration.ConfigurationManager.AppSettings["TBK_CERTIFICATE_PATH"];

            /** Modo de Utilización */
            certificate.Add("environment", "INTEGRACION");

            /** Certificado Publico (Dirección fisica de certificado o contenido) */
            certificate.Add("public_cert", certFolder + "\\certificates\\597020000541\\tbk.pem");

            /** Ejemplo de Ruta de Certificado de Salida */
            certificate.Add("webpay_cert", certFolder + "\\certificates\\597020000541\\597020000541.pfx");

            /** Ejemplo de Password de Certificado de Salida */
            certificate.Add("password", "transbank123");

            /** Codigo Comercio */
            certificate.Add("commerce_code", "597020000541");

            return certificate;

        }
    }
}