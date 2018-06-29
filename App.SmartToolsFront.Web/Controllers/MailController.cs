using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using App.SmartToolsFront.DTO;
using App.SmartToolsFront.DAL;
using App.SmartToolsFront.Web.ViewModels;
using System.Configuration;
using System.IO;
using System.Net.Mail;

namespace App.SmartToolsFront.Web.Controllers
{
    public class MailController : ApiController
    {
        [HttpPost]
        public IHttpActionResult Post([FromBody] MailViewModel model)
        {
            try
            {
                string body = string.Empty;
                string correoAvisoVenta = System.Configuration.ConfigurationManager.AppSettings["CORREO_AVISO"];
                switch (model.tipo)
                {
                    case 1:
                        body = this.PopulateBodyRecoverPass(model.mensaje);
                        break;
                    case 2:
                        body = this.PopulateBodyRegister(model.mensaje);
                        break;
                    case 3:
                        body = this.PopulateBodyCompra(model.mensaje);
                        break;
                    case 4:
                        body = this.PopulateBodyRecoverPass(model.mensaje);
                        break;
                    case 5:
                        body = this.PopulateBodyAvisoVenta(model.mensaje);
                        model.email_destinatario = correoAvisoVenta;
                        break;

                }
                
                this.SendHtmlFormattedEmail(model.email_destinatario, model.asunto, body);

                return Ok(model);
            }
            catch { BadRequest(); }
            return Ok(model);
        }

        private string PopulateBodyAvisoVenta(string text)
        {
            string body = string.Empty;
            string nrNota = text.Split('|')[0];
            string nombre = text.Split('|')[1];
            string rut = text.Split('|')[2];

            using (StreamReader reader = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("~/app/components/mail/avisoVenta.component.html")))
            {
                body = reader.ReadToEnd();
            }
            body = body.Replace("{nota}", nrNota);
            body = body.Replace("{cliente}", nombre);
            body = body.Replace("{rut}", rut);
            return body;
        }

        private string PopulateBodyRecoverPass(string text)
        {
            string body = string.Empty;
            using (StreamReader reader = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("~/app/components/mail/recuperaPassMail.component.html")))
            {
                body = reader.ReadToEnd();
            }
            body = body.Replace("{Description}", text);
            return body;
        }

        private string PopulateBodyRegister(string text)
        {
            string body = string.Empty;
            using (StreamReader reader = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("~/app/components/mail/registroMail.component.html")))
            {
                body = reader.ReadToEnd();
            }
            body = body.Replace("{email}", text);
            return body;
        }

        private string PopulateBodyCompra(string text)
        {
            string processText = "";
            string[] splited = text.Split(';');

            MaestroProductos m = new MaestroProductos();

            for (int i = 0; i <= splited.Length - 1; i++)
            {
                if (!splited[i].Contains("table>") && !splited[i].Contains("tr>") && !splited[i].Contains("td>"))
                {
                    ProductosDTO producto = m.GetProductoByCodigo(splited[i].ToString().Trim());
                    splited[i] = producto.DesProd;
                }
            }

            for (int i = 0; i <= splited.Length - 1; i++)
            {
                processText = processText + splited[i].ToString().Trim();
            }

            string body = string.Empty;
            using (StreamReader reader = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("~/app/components/mail/compraMail.component.html")))
            {
                body = reader.ReadToEnd();
            }
            body = body.Replace("{tablaProductos}", processText);
            return body;
        }

        private void SendHtmlFormattedEmail(string recepientEmail, string subject, string body)
        {
            string server = System.Configuration.ConfigurationManager.AppSettings["SMTP_SERVER"];
            string user = System.Configuration.ConfigurationManager.AppSettings["SMTP_USER"];
            string pass = System.Configuration.ConfigurationManager.AppSettings["SMTP_PASS"];
            string port = System.Configuration.ConfigurationManager.AppSettings["SMTP_PORT"];
            string ssl = System.Configuration.ConfigurationManager.AppSettings["SMTP_SSL"];
            string cc = System.Configuration.ConfigurationManager.AppSettings["MAIL_CC"];

            using (MailMessage mailMessage = new MailMessage())
            {
                if (cc != string.Empty)
                    mailMessage.CC.Add(cc);

                mailMessage.From = new MailAddress(user);
                mailMessage.Subject = subject;
                mailMessage.Body = body;
                mailMessage.IsBodyHtml = true;
                mailMessage.To.Add(new MailAddress(recepientEmail));
                SmtpClient smtp = new SmtpClient();
                smtp.Host = server;
                smtp.EnableSsl = Convert.ToBoolean(ssl);
                System.Net.NetworkCredential NetworkCred = new System.Net.NetworkCredential();
                NetworkCred.UserName = user;
                NetworkCred.Password = pass;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = NetworkCred;
                smtp.Port = Convert.ToInt32(port);
                smtp.Send(mailMessage);
            }
        }

    }
}
