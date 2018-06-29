using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Webpay.Transbank.Library;
using Webpay.Transbank.Library.Wsdl.Normal;
using Webpay.Transbank.Library.Wsdl.Nullify;

namespace App.SmartToolsFront.Web.Controllers
{
    public class TbkController : Controller
    {
        /** Mensaje de Ejecución */
        private string message;

        /** Crea Dictionary con datos Integración Pruebas */
        private Dictionary<string, string> certificate = App_Start.CertNormal.certificate();

        /** Crea Dictionary con datos de entrada */
        private Dictionary<string, string> request = new Dictionary<string, string>();


        // GET: Tbk
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PagoTbk()
        {
            Configuration configuration = new Configuration();
            configuration.Environment = certificate["environment"];
            configuration.CommerceCode = certificate["commerce_code"];
            configuration.PublicCert = certificate["public_cert"];
            configuration.WebpayCert = certificate["webpay_cert"];
            configuration.Password = certificate["password"];

            ViewModels.TbkViewModel vm = new ViewModels.TbkViewModel();
            Webpay.Transbank.Library.Webpay webpay = new Webpay.Transbank.Library.Webpay(configuration);

            String httpHost = System.Web.HttpContext.Current.Request.ServerVariables["HTTP_HOST"].ToString();
            String selfURL = System.Web.HttpContext.Current.Request.ServerVariables["URL"].ToString();
            string action = !String.IsNullOrEmpty(System.Web.HttpContext.Current.Request.QueryString["action"]) ? System.Web.HttpContext.Current.Request.QueryString["action"] : "init";
            string sample_baseurl = "http://" + httpHost + selfURL;

            Dictionary<string, string> description = new Dictionary<string, string>();

            description.Add("VD", "Venta Deb&iacute;to");
            description.Add("VN", "Venta Normal");
            description.Add("VC", "Venta en cuotas");
            description.Add("SI", "cuotas sin inter&eacute;s");
            description.Add("S2", "2 cuotas sin inter&eacute;s");
            description.Add("NC", "N cuotas sin inter&eacute;s");

            Dictionary<string, string> codes = new Dictionary<string, string>();

            codes.Add("0", "Transacci&oacute;n aprobada");
            codes.Add("-1", "Rechazo de transacci&oacute;n");
            codes.Add("-2", "Transacci&oacute;n debe reintentarse");
            codes.Add("-3", "Error en transacci&oacute;n");
            codes.Add("-4", "Rechazo de transacci&oacute;n");
            codes.Add("-5", "Rechazo por error de tasa");
            codes.Add("-6", "Excede cupo m&aacute;ximo mensual");
            codes.Add("-7", "Excede l&iacute;mite diario por transacci&oacute;n");
            codes.Add("-8", "Rubro no autorizado");

            string buyOrder;
            string tx_step = "";
            string authorizationCodeR = "";
            string idVenta = "";
            decimal amount = 0;
            string horaProceso = "";
            string minProceso = "";
            string secProceso = "";
            string clientName = "";

            try
            {
                try { clientName = (Request.Cookies["clientName"].Value != null) ? Request.Cookies["clientName"].Value : ""; }
                catch { clientName = ""; }
                
                switch (action)
                {
                    default:

                        tx_step = "Init";
                        Random random = new Random();
                        horaProceso = Request.Cookies["horaProceso"].Value;
                        minProceso = Request.Cookies["minProceso"].Value;
                        secProceso = Request.Cookies["secProceso"].Value;
                        idVenta = Request.Cookies["IdVenta"].Value;
                        amount = Convert.ToDecimal(Request.Cookies["amount"].Value);
                        buyOrder = idVenta; //random.Next(0, 1000).ToString() + idVenta;
                        string sessionId = random.Next(0, 1000).ToString();
                        string urlReturn = sample_baseurl + "?action=result";
                        string urlFinal = sample_baseurl + "?action=end";

                        request.Add("amount", amount.ToString());
                        request.Add("buyOrder", buyOrder.ToString());
                        request.Add("sessionId", sessionId.ToString());
                        request.Add("urlReturn", urlReturn.ToString());
                        request.Add("urlFinal", urlFinal.ToString());

                        DateTime aDate = DateTime.Now;
                        try
                        {
                            aDate = new DateTime(aDate.Year, aDate.Month, aDate.Day, Convert.ToInt32(horaProceso), Convert.ToInt32(minProceso), Convert.ToInt32(secProceso));
                        }
                        catch { }

                        DAL.MaestroVentas m1 = new DAL.MaestroVentas();
                        DTO.LogTbkDTO log1 = new DTO.LogTbkDTO
                        {
                            IdVenta = Convert.ToInt32(idVenta),
                            Fecha = aDate,
                            Monto = Convert.ToDouble(Request.Cookies["amount"].Value),
                            Token = string.Empty,
                            CodigoTbk = string.Empty,
                            Estado = "Pendiente",
                            OrdenCompra = buyOrder
                        };
                        m1.SaveLogtBK(log1);

                        wsInitTransactionOutput result = webpay.getNormalTransaction().initTransaction(amount, buyOrder, sessionId, urlReturn, urlFinal);
                        
                        if (result.token != null && result.token != "")
                        {
                            message = "Sesion iniciada con exito en Webpay";
                        }
                        else
                        {
                            message = "WebPay no disponible";
                            tx_step = "Error";
                        }

                        vm.token = result.token;
                        vm.url = result.url;
                        vm.step = tx_step;
                        vm.message = message;
                        vm.authorizationCode = "";
                        vm.amount = 0;
                        vm.buyOrder = "";
                        vm.client = clientName;

                        break;

                    case "result":

                        tx_step = "Get Result";
                        string idVentaResp = Request.Cookies["IdVenta"].Value;
                        string[] keysPost = Request.Form.AllKeys;
                        string token = Request.Form["token_ws"];
                        request.Add("token", token.ToString());

                        transactionResultOutput result2 = webpay.getNormalTransaction().getTransactionResult(token);

                        if (result2.detailOutput[0].responseCode == 0)
                        {
                            authorizationCodeR = result2.detailOutput[0].authorizationCode;
                            message = "Pago ACEPTADO por webpay (se deben guardar datos para mostrar voucher)";

                            System.Web.HttpContext.Current.Response.Write("<script>localStorage.setItem('authorizationCode', " + result2.detailOutput[0].authorizationCode + ")</script>");
                            System.Web.HttpContext.Current.Response.Write("<script>localStorage.setItem('commercecode', " + result2.detailOutput[0].commerceCode + ")</script>");
                            System.Web.HttpContext.Current.Response.Write("<script>localStorage.setItem('amount', " + result2.detailOutput[0].amount + ")</script>");
                            System.Web.HttpContext.Current.Response.Write("<script>localStorage.setItem('buyOrder', " + result2.detailOutput[0].buyOrder + ")</script>");
                            System.Web.HttpContext.Current.Response.Write("<script>localStorage.setItem('clientName', " + clientName + ")</script>");

                            vm.token = token;
                            vm.url = result2.urlRedirection;
                            vm.step = tx_step;
                            vm.message = message;
                            vm.authorizationCode = authorizationCodeR;
                            vm.amount = (double)result2.detailOutput[0].amount;
                            vm.buyOrder = result2.detailOutput[0].buyOrder;
                            vm.client = clientName;

                            DAL.MaestroVentas m = new DAL.MaestroVentas();
                            m.ActualizaEstadoVenta("2", Convert.ToInt32(idVentaResp));

                            DTO.LogTbkDTO log = new DTO.LogTbkDTO {
                                IdVenta = Convert.ToInt32(idVentaResp),
                                Fecha = result2.transactionDate,
                                Monto = vm.amount,
                                Token = vm.token,
                                CodigoTbk = vm.authorizationCode,
                                Estado = "Finalizado",
                                OrdenCompra = vm.buyOrder
                            };
                            m.UpdateStateLogtBK(log);

                            Helpers.CreaNotaVenta cnt = new Helpers.CreaNotaVenta();
                            double r = cnt.CreaNotaVentaSofltand(Convert.ToInt32(idVentaResp));
                        }
                        else
                        {
                            message = "Pago RECHAZADO por WebPay, Codigo: " + result2.detailOutput[0].responseCode;

                            vm.token = token;
                            vm.url = result2.urlRedirection;
                            vm.step = "Error";
                            vm.message = message;
                            vm.authorizationCode = result2.detailOutput[0].authorizationCode;
                            vm.amount = (double)result2.detailOutput[0].amount;
                            vm.buyOrder = result2.detailOutput[0].buyOrder;
                            vm.client = clientName;

                            DAL.MaestroVentas m = new DAL.MaestroVentas();
                            DTO.LogTbkDTO log = new DTO.LogTbkDTO
                            {
                                IdVenta = Convert.ToInt32(idVentaResp),
                                Fecha = result2.transactionDate,
                                Monto = vm.amount,
                                Token = vm.token,
                                CodigoTbk = vm.authorizationCode,
                                Estado = "Rechazado",
                                OrdenCompra = vm.buyOrder
                            };
                            m.UpdateStateLogtBK(log);
                        }

                        Response.Cookies["amount"].Expires = DateTime.Now.AddDays(-1);
                        Response.Cookies["IdVenta"].Expires = DateTime.Now.AddDays(-1);
                        Response.Cookies["horaProceso"].Expires = DateTime.Now.AddDays(-1);
                        Response.Cookies["minProceso"].Expires = DateTime.Now.AddDays(-1);
                        Response.Cookies["secProceso"].Expires = DateTime.Now.AddDays(-1);
                        Response.Cookies["clientName"].Expires = DateTime.Now.AddDays(-1);

                        break;

                    case "end":

                        tx_step = "End";
                        request.Add("", "");
                        message = "Transacción Finalizada";
                        string next_page = sample_baseurl + "?action=nullify";

                        System.Web.HttpContext.Current.Response.Write("<form action=" + next_page + " method='post'><input type='hidden' name='commercecode' id='commercecode' value=''><input type='hidden' name='authorizationCode' id='authorizationCode' value=''><input type='hidden' name='amount' id='amount' value=''><input type='hidden' name='buyOrder' id='buyOrder' value=''><input type='hidden' name='client' id='client' value=''><input type='hidden' name='product' id='product' value=''><input type='hidden' value='Anular Transacci&oacute;n &raquo;'></form>");
                        System.Web.HttpContext.Current.Response.Write("<script>var commercecode = localStorage.getItem('commercecode');document.getElementById('commercecode').value = commercecode;</script>");
                        System.Web.HttpContext.Current.Response.Write("<script>var authorizationCode = localStorage.getItem('authorizationCode');document.getElementById('authorizationCode').value = authorizationCode;</script>");
                        System.Web.HttpContext.Current.Response.Write("<script>var amount = localStorage.getItem('amount');document.getElementById('amount').value = amount;</script>");
                        System.Web.HttpContext.Current.Response.Write("<script>var buyOrder = localStorage.getItem('buyOrder');document.getElementById('buyOrder').value = buyOrder;</script>");
                        System.Web.HttpContext.Current.Response.Write("<script>var clientName = localStorage.getItem('clientName');document.getElementById('clientName').value = clientName;</script>");

                        vm.token = "";
                        vm.url = "";
                        vm.step = tx_step;
                        vm.message = message;
                        vm.authorizationCode = authorizationCodeR;
                        vm.amount = (double)amount;
                        vm.buyOrder = "";
                        vm.client = clientName;

                        break;

                    case "nullify":

                        tx_step = "nullify";
                        string[] keysNullify = Request.Form.AllKeys;
                        string commercecode = Request.Form["commercecode"];
                        string authorizationCode = Request.Form["authorizationCode"];
                        decimal authorizedAmount = Int64.Parse(Request.Form["amount"]);
                        buyOrder = Request.Form["buyOrder"];
                        decimal nullifyAmount = 3;

                        request.Add("authorizationCode", authorizationCode.ToString());
                        request.Add("authorizedAmount", authorizedAmount.ToString());
                        request.Add("buyOrder", buyOrder.ToString());
                        request.Add("nullifyAmount", nullifyAmount.ToString());
                        request.Add("commercecode", commercecode.ToString());

                        nullificationOutput resultNullify = webpay.getNullifyTransaction().nullify(authorizationCode, authorizedAmount, buyOrder, nullifyAmount, commercecode);
                        message = "Transacción Finalizada";

                        vm.token = "";
                        vm.url = "";
                        vm.step = tx_step;
                        vm.message = message;
                        vm.authorizationCode = "";
                        vm.amount = 0;
                        vm.buyOrder = "";
                        vm.client = "";

                        break;
                }
            }
            catch (Exception ex)
            {
                vm.token = "";
                vm.url = "";
                vm.step = "Error";
                vm.message = "Ocurrio un error en la transacción (Validar correcta configuración de parametros). " + ex.Message;
                vm.authorizationCode = "";
                vm.amount = 0;
                vm.buyOrder = "";
                vm.client = "";
            }

            return PartialView(vm);
        }
    }
}