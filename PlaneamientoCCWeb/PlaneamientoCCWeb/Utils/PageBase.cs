using PlaneamientoCCWeb.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

//namespace PlaneamientoCCWeb.Utils
//{
    public static class PageBase
    {
        #region Get
        public static String getTokenUsuario()
        {
            return HttpContext.Current.Session["TOKEN"].ToString();
        }
        public static String getVista()
        {
            return HttpContext.Current.Session["VISTA"].ToString();
        }
        public static String getCompaniaUsuario()
        {
            return HttpContext.Current.Session["CODEMPRESA"].ToString();
        }
        public static String getCodigoUsuario()
        {
            return HttpContext.Current.Session["LoginUsuario"].ToString();
        }
        public static String getCodigoCDR()
        {
            return HttpContext.Current.Session["CODCDR"].ToString();
        }
        public static String getNombreUsuario()
        {
            return HttpContext.Current.Session["NOMUSUARIO"].ToString();
        }
        public static String getEstructOpciones()
        {
            return HttpContext.Current.Session["STROPCIONES"].ToString();
        }
        public static String getClavesPerfiles()
        {
            return HttpContext.Current.Session["CLAVEPERFIL"].ToString();
        }
        public static Boolean getEditar()
        {
            return Convert.ToBoolean(HttpContext.Current.Session["EDITAR"]);
        }
        public static Boolean getGrabar()
        {
            return Convert.ToBoolean(HttpContext.Current.Session["GRABAR"]);
        }
        public static Boolean getEliminar()
        {
            return Convert.ToBoolean(HttpContext.Current.Session["ELIMINAR"]);
        }
        public static Boolean getExportar()
        {
            return Convert.ToBoolean(HttpContext.Current.Session["EXPORTAR"]);
        }
        public static Boolean getReasignar()
        {
            return Convert.ToBoolean(HttpContext.Current.Session["REASIGNAR"]);
        }
        public static string getPathGLobal()
        {
            return Constantes.PathGlobal;
        }
        #endregion
        #region Set
        public static void setCodigoUsuario(string codUsuario)
        {
            HttpContext.Current.Session["CODIGOUSR"] = codUsuario;
            HttpContext.Current.Session["LoginUsuario"] = codUsuario;
        }
        public static void setCodigoCDR(string codCdr)
        {
            HttpContext.Current.Session["CODCDR"] = codCdr;
        }
        public static void setCodigoBT(string codBt)
        {
            HttpContext.Current.Session["CODIGOBT"] = codBt;
        }
        public static void setNombreUsuario(string nomUsuario)
        {
            HttpContext.Current.Session["NOMUSUARIO"] = nomUsuario;
        }
        public static void setEstructOpciones(string strStructura)
        {
            HttpContext.Current.Session["STROPCIONES"] = strStructura;
        }
        public static void setCodigoEmpresa(string codEmpresa)
        {
            HttpContext.Current.Session["CODEMPRESA"] = codEmpresa;
        }
        public static void setCodigoPuesto(string codPuesto)
        {
            HttpContext.Current.Session["CODPUESTO"] = codPuesto;
        }
        public static void setClavesPerfiles(string codClaves)
        {
            HttpContext.Current.Session["CLAVEPERFIL"] = codClaves;
        }
        public static void setEditar(bool respuesta)
        {
            HttpContext.Current.Session["EDITAR"] = respuesta;
        }
        public static void setEliminar(bool respuesta)
        {
            HttpContext.Current.Session["ELIMINAR"] = respuesta;
        }
        public static void setExportar(bool respuesta)
        {
            HttpContext.Current.Session["EXPORTAR"] = respuesta;
        }
        public static void setGrabar(bool respuesta)
        {
            HttpContext.Current.Session["GRABAR"] = respuesta;
        }
        public static void setReasignar(bool respuesta)
        {
            HttpContext.Current.Session["REASIGNAR"] = respuesta;
        }
        public static void setVista(string vista)
        {
            HttpContext.Current.Session["VISTA"] = vista;
        }
        public static void setTokenUsuario(string usuario)
        {
            HttpContext.Current.Session["TOKEN"] = usuario;
        }
        #endregion
        public static void reiniciarSesiones()
        {
            try
            {
                HttpContext.Current.Session["TOKEN"] = "";
                HttpContext.Current.Session["VISTA"] = "";
                HttpContext.Current.Session["CODIGOUSR"] = "";
                HttpContext.Current.Session["CODIGOBT"] = "";
                HttpContext.Current.Session["NOMUSUARIO"] = "";
                HttpContext.Current.Session["CODCDR"] = "";
                HttpContext.Current.Session["LoginUsuario"] = null;
                HttpContext.Current.Session["CODEMPRESA"] = "";
                HttpContext.Current.Session["STROPCIONES"] = "";
                HttpContext.Current.Session["CODPUESTO"] = "";
                HttpContext.Current.Session["CLAVEPERFIL"] = "";
                HttpContext.Current.Session["FIRMA"] = "";
                HttpContext.Current.Session["EDITAR"] = false;
                HttpContext.Current.Session["EXPORTAR"] = false;
                HttpContext.Current.Session["GRABAR"] = false;
                HttpContext.Current.Session["ELIMINAR"] = false;
                HttpContext.Current.Session["REASIGNAR"] = false;
            }
            catch { }
        }
    }
//}