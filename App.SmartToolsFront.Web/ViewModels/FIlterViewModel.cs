using App.SmartToolsFront.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.SmartToolsFront.Web.ViewModels
{
    public class FIlterViewModel
    {
        public string filterValue { get; set; }
        public int OrderBy { get; set; }
        public List<CategoriasDTO> Categorias { get; set; }
        public string Email { get; set; }
    }
}