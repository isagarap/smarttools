using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.SmartToolsFront.Web.ViewModels
{
    public class MailViewModel
    {
        public int tipo { get; set; }
        public string nombres { get; set; }
        public string apellidos { get; set; }
        public string asunto { get; set; }
        public string mensaje { get; set; }
        public string email_destinatario { get; set; }
    }
}