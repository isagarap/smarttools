using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.SmartToolsFront.Web.ViewModels
{
    public class TbkViewModel
    {
        public string token { get; set; }
        public string url { get; set; }
        public string step { get; set; }
        public string message { get; set; }
        public string authorizationCode { get; set; }
        public double amount { get; set; }
        public string buyOrder { get; set; }

        public string client { get; set; }
    }
}