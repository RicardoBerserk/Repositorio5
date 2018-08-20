using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace PlaneamientoCCWeb.Utils
{
    public class Constantes
    {


        public static bool ON = true;
        public static bool OFF = false;
        public static string PaginaInicio = "~/Home";
        public static string PaginaLogin = "~/";
        public static string PermisoConcedido = "ON";    

        public const string _KEY_SEMILLA = "k3Y-cR3d15CoT14-Sc0t14B4nK_2o18XYZ";
        public const string _SALT_SEMILLA = "983csfsbp@-001@@@-_xyz";
        public const string AccesoSatisfactorio = "Usuario logueado de forma exitosa!";
        public const string AccesoRestringido = "El nombre de usuario ó contraseña son incorrectos.";
        public static string PathGlobal = ConfigurationManager.AppSettings["PATHGLOBAL"].ToString();


        public struct Parametros
        {
            public static string FileServerCarga = "~/Referidos/XLS/";
            public static string DatosNoProcesados = "Descargar datos no procesados";
            public static string TotalDatosProcesados = "Total de datos procesadas";
            public static string PuestosNoRegistrados = "PuestosNoRegistrados";
            public static string ValidaCargaXLS = "Por favor solo se puede cargar archivos con extensión .xls, .xlsx ó .csv";
            public static string FormatoNoSeleccionado = "Por favor seleccionar documento a cargar";
            public static string CDRNoRegistrados = "CDRNoRegistrados";
            public static string JerarquiaNoRegistrados = "JerarquiaNoRegistrados";
            public static string DataNoSeProcesa = "Lectura de información no puede obtener resultados";
            public static string DominioSudameris = ConfigurationManager.AppSettings["DOMINIOS"].ToString();
        }
    }
}