using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.SmartToolsFront.DTO
{
    public class ResponseInfo
    {
        public bool Success { get; set; }
        public string Message { get; set; }

        public ResponseInfo()
        {

        }

        public ResponseInfo(bool success, string message)
        {
            Success = success;
            Message = message;
        }

        public void SetSuccess()
        {
            Success = true;
            Message = string.Empty;
        }

        public void SetError(string message)
        {
            Success = false;
            Message = message;
        }

        public static ResponseInfo CreateSuccess()
        {
            ResponseInfo r = new ResponseInfo();
            r.SetSuccess();
            return r;
        }

        public static ResponseInfo CreateError(string message)
        {
            ResponseInfo r = new ResponseInfo();
            r.SetError(message);
            return r;
        }
    }
}
