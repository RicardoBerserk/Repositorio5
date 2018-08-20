using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlaneamientoCCWeb.Models
{
    public class Opciones
    {
        public int PACodOpcion { get; set; }
        public int PACodOpcionPadre { get; set; }
        public string PANombreOpcion { get; set; }
        public string nombreOpcionPadre { get; set; }
        public string PAUrlOpcion { get; set; }
        public bool PAEstadoOpcion { get; set; }
        public bool Seleccionado { get; set; }
        public string PAEmpresa { get; set; }
        public string PACDRUsuario { get; set; }
        public string PAUSRCodigoPuesto { get; set; }
        public string Estado { get; set; }

    }
}