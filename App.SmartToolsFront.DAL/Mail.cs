using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;

namespace App.SmartToolsFront.DAL
{
    public class Mail
    {
        public string Server { get; set; }
        public string User { get; set; }
        public string Passw { get; set; }
        public string Port { get; set; }
        public bool Ssl { get; set; }

        #region CONSTRUCTOR
        /// <summary>
        /// No requiere de establecer los parametros de coneccion
        /// </summary>
        public Mail()
        {
            string server = System.Configuration.ConfigurationManager.AppSettings["SMTP_SERVER"];
            string user = System.Configuration.ConfigurationManager.AppSettings["SMTP_USER"];
            string pass = System.Configuration.ConfigurationManager.AppSettings["SMTP_PASS"];
            string port = System.Configuration.ConfigurationManager.AppSettings["SMTP_PORT"];
            string ssl = System.Configuration.ConfigurationManager.AppSettings["SMTP_SSL"];

            this.Server = server;
            this.User = user;
            this.Passw = pass;
            this.Port = port;
            this.Ssl = Convert.ToBoolean(ssl);

        }
        #endregion

        public void Send(MailVM m, MailPriority priority)
        {
            if (string.IsNullOrWhiteSpace(m.From))
                throw new MissingFieldException("MailService.From");
            if (m.To == null || m.To.Count() == 0)
                throw new MissingFieldException("MailService.To");


            MailMessage mail = new MailMessage();
            mail.Subject = m.Subject;
            mail.Priority = priority;
            mail.Body = m.Body;
            mail.IsBodyHtml = m.IsHtmlBody;
            mail.From = new MailAddress(m.From);

            foreach (string to in m.To)
                mail.To.Add(to);
            foreach (string cc in m.Cc)
                mail.CC.Add(cc);
            foreach (Attachment a in m.Files)
                mail.Attachments.Add(a);

            SmtpClient smtp = new SmtpClient();
            smtp.EnableSsl = this.Ssl;
            smtp.Host = this.Server;
            smtp.Port = int.Parse(this.Port);

            smtp.Credentials = new NetworkCredential(this.User, this.Passw);
            //smtp.UseDefaultCredentials = false; // si se descomenta produce error con servidor email azure
            smtp.Send(mail);
        }
    }

    public class MailVM
    {
        public MailVM()
        {
            this.To = new List<string>();
            this.Cc = new List<string>();
            this.Files = new List<Attachment>();
        }

        public string From { get; set; }
        public List<string> To { get; set; }
        public List<string> Cc { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public bool IsHtmlBody { get; set; }
        public List<Attachment> Files { get; set; }

    }
}
