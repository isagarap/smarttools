using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using App.SmartToolsFront.DTO;
using App.SmartToolsFront.DAL;

namespace App.SmartToolsFront.Web.Controllers
{
    public class BannersController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            MaestroBanners m = new MaestroBanners();
            List<BannersDTO> banners = m.GetAll();
            return Ok(banners);
        }
    }
}
