using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using PlaneamientoCCWeb.Utils;
using PlaneamientoCCWeb.Models;

namespace PlaneamientoCCWeb.Controllers
{
    public class SeguridadController : Controller
    {
        public static StringBuilder strStructura = new StringBuilder();

        // GET: Seguridad
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Login(string usuario, string password)
        {
            password = "nirvana12";
            object message = null;
            if (ModelState.IsValid)
            {
                bool flag = false;
                string mensaje = string.Empty;
                string nombre = string.Empty;
                string mail = string.Empty;
                try
                {
                    //GetUsuario
                    //string[] users = SeguridadActive.GetUser(usuario, password);
                    string[] users = SeguridadActive.GetUsuario2(usuario, password);
                    //string[] users = { "edgar torres custodio", "edgar.torres@scotiabank.com.pe" };
                    if (users.Length > 1)
                    {
                        nombre = users[0].ToString();
                        mail = users[1].ToString();
                        if (!string.IsNullOrEmpty(nombre) && !string.IsNullOrEmpty(mail))
                        {
                            flag = true;
                            mensaje = Constantes.AccesoSatisfactorio;
                            PageBase.setTokenUsuario(string.Format("{0}|{1}|{2}", nombre, mail, usuario));
                        }
                        else
                        {
                            flag = false;
                            mensaje = Constantes.AccesoRestringido;
                        }
                    }
                    else
                    {
                        flag = false;
                        mensaje = Constantes.AccesoRestringido;
                    }
                }
                catch (Exception ex)
                {
                    flag = false;
                    mensaje = ex.Message;
                    nombre = string.Empty;
                    mail = string.Empty;
                }
                if (flag)
                {
                    FormsAuthentication.SetAuthCookie(PageBase.getTokenUsuario(), false);
                }
                else
                {
                    ModelState.AddModelError("", mensaje);
                }

                message = new
                {
                    permitir = flag,
                    aviso = mensaje
                };
            }
            return Json(message, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult Redirigir(string respuesta)
        {
            object message = null;
            string url = string.Empty;

            if (FormsAuthentication.CookiesSupported == true)
            {
                if (Request.Cookies[FormsAuthentication.FormsCookieName] != null)
                {
                    String[] arrUsuario = FormsAuthentication.Decrypt(Request.Cookies[FormsAuthentication.FormsCookieName].Value).Name.Split('|');
                    String Cod_Usuario = arrUsuario[2].ToString();
                    PageBase.setCodigoUsuario(Cod_Usuario);
                    PageBase.setVista(Constantes.PermisoConcedido);

                    PageBase.setNombreUsuario(Cod_Usuario);
                    //var data = response.Content.ReadAsAsync<List<Models.Product>>().Result;
                    //var data = response;
                    ViewBag.Title = "All Products";
                    strStructura.Clear();

                    strStructura.Clear();
                    var oListaEstructura = getEstructura(Cod_Usuario);

                    if (oListaEstructura.Count() > 0)
                    {
                        getArbol(oListaEstructura, 0, "");
                        strStructura.Append("</ul>");
                        PageBase.setEstructOpciones(strStructura.ToString());
                        PageBase.setVista(Constantes.PermisoConcedido);
                    }
                    else
                    {
                        oListaEstructura = getEstructura(Cod_Usuario);
                        if (oListaEstructura.Count() > 0)
                        {
                            getArbol(oListaEstructura, 0, "");
                            strStructura.Append("</ul>");
                            //oEntity.USRCodigo = oEntity.CodigoEmpleado;
                            PageBase.setEstructOpciones(strStructura.ToString());
                            //PageBase.setCodigoUsuario(oEntity.USRCodigo);
                            PageBase.setCodigoUsuario(Cod_Usuario);
                            PageBase.setVista(Constantes.PermisoConcedido);
                        }
                    }
                    url = VirtualPathUtility.ToAbsolute(Constantes.PaginaInicio);

                    /*
                    SEC_Usuarios oEntity = new SEC_Usuarios();
                    new SeguridadNegocio().BuscarUsuarioGlobal(Cod_Usuario, out oEntity);
                    try
                    {
                        if (oEntity.USRCodigo != null)
                        {
                            PageBase.setCodigoUsuario(oEntity.USRCodigo);
                            PageBase.setCodigoCDR(oEntity.USRCDRCodigo);
                            PageBase.setCodigoBT(oEntity.CodigoBT);
                            PageBase.setNombreUsuario(oEntity.USRNombreUsuario);

                            ListSEC_Opciones oListaEstructura = new ListSEC_Opciones();

                            strStructura.Clear();
                            oListaEstructura = getEstructura(oEntity.USRCodigo);
                            if (oListaEstructura.Count() > 0)
                            {
                                getArbol(oListaEstructura, 0, "");
                                strStructura.Append("</ul>");
                                PageBase.setEstructOpciones(strStructura.ToString());
                                PageBase.setVista(Constantes.PermisoConcedido);
                            }
                            else
                            {
                                oListaEstructura = getEstructura(oEntity.CodigoEmpleado);
                                if (oListaEstructura.Count() > 0)
                                {
                                    getArbol(oListaEstructura, 0, "");
                                    strStructura.Append("</ul>");
                                    oEntity.USRCodigo = oEntity.CodigoEmpleado;
                                    PageBase.setEstructOpciones(strStructura.ToString());
                                    PageBase.setCodigoUsuario(oEntity.USRCodigo);
                                    PageBase.setVista(Constantes.PermisoConcedido);
                                }
                            }
                            url = VirtualPathUtility.ToAbsolute(Constantes.PaginaInicio);
                        }
                        else
                        {
                            url = VirtualPathUtility.ToAbsolute(Constantes.PaginaLogin);
                        }
                    }
                    catch
                    {
                        url = VirtualPathUtility.ToAbsolute(Constantes.PaginaLogin);
                    }

                    */
                    url = VirtualPathUtility.ToAbsolute(Constantes.PaginaInicio);

                    message = new
                    {
                        link = url
                    };
                }
            }
            return Json(message, JsonRequestBehavior.AllowGet);
        }

        public static List<Opciones> getEstructura(string codUsuario)
        {
            List<Opciones> oListaEstructura = new List<Opciones>();
            int respuesta = 0; string mensaje = string.Empty; 
            //SEC_Perfiles oDataPerfil = null;

            RepositorioService serviceObj = new RepositorioService();
            HttpResponseMessage response = serviceObj.GetResponse("Menu/OpcionesPerfil");
            response.EnsureSuccessStatusCode();
            //oListaEstructura = response.Content.ReadAsAsync<List<Opciones>>().Result;
            var resultado = response.Content.ReadAsAsync<List<Opciones>>().Result;
            //oListaEstructura = new GestionOpcionesNegocio().ListarOpcionesSistemaPerfil(codUsuario, out oDataPerfil, out respuesta, out mensaje);
            if (resultado.Count() > 0)
            {
                //PageBase.setCodigoPuesto(oListaEstructura[0].PAUSRCodigoPuesto);
                //PageBase.setCodigoCDR(oListaEstructura[0].PACDRUsuario);
                //PageBase.setCodigoEmpresa(oListaEstructura[0].PAEmpresa);

                /*
                if (oDataPerfil != null)
                {
                    PageBase.setClavesPerfiles(oDataPerfil.PAClave);
                    if (oDataPerfil.PAFlagEditar == true) { PageBase.setEditar(true); }
                    if (oDataPerfil.PAFlagEliminar == true) { PageBase.setEliminar(true); }
                    if (oDataPerfil.PAFlagExportar == true) { PageBase.setExportar(true); }
                    if (oDataPerfil.PAFlagGrabar == true) { PageBase.setGrabar(true); }
                    if (oDataPerfil.PAFlagReasignar == true) { PageBase.setReasignar(true); }
                }*/

            }
            return resultado;
        }

        public static string getArbol(List<Opciones> oListaEstructura, int codpadre, string inicio)
        {
            try
            {
                var subListaInicial = oListaEstructura.Select(sel => new { sel.PACodOpcion, sel.PANombreOpcion, sel.PACodOpcionPadre, sel.PAUrlOpcion })
                                   .Where(sel => sel.PACodOpcionPadre == codpadre);
                string codinicial = string.Empty;

                if (subListaInicial.Count() > 0)
                {
                    if (string.IsNullOrEmpty(inicio))
                    {
                        //strStructura.Append("<ul class='navega'>");
                        strStructura.Append("<ul class='main-navigation'>");
                        strStructura.Append("<li><a href='" + VirtualPathUtility.ToAbsolute(Constantes.PaginaInicio) + "'>Inicio</a></li>");
                    }
                    else
                    {
                        strStructura.Append("<ul>");
                    }
                    foreach (var data in subListaInicial)
                    {
                        int codigo = data.PACodOpcion;
                        string descripcion = data.PANombreOpcion;
                        int padre = data.PACodOpcionPadre;
                        string url = data.PAUrlOpcion;

                        string codigoUnico = string.Concat(codigo.ToString(), padre.ToString());

                        if (subListaInicial.Count() == 1)
                        {
                            strStructura.Append("<li id='" + codigoUnico + "'>");
                        }
                        else
                        {
                            strStructura.Append("<li id='" + codigoUnico + "'>");
                        }

                        string returnUrl = string.Empty;
                        if (!string.IsNullOrEmpty(url))
                        {
                            returnUrl = VirtualPathUtility.ToAbsolute(url);
                        }
                        else { returnUrl = "#"; }
                        strStructura.Append("<a href='" + returnUrl + "' title='" + descripcion + "' >");
                        strStructura.Append(descripcion);
                        strStructura.Append("</a>");
                        getArbol(oListaEstructura, codigo, codigoUnico);
                        strStructura.Append("</li>");

                    }
                    if (!string.IsNullOrEmpty(inicio))
                    {
                        strStructura.Append("</ul>");
                    }
                }

            }
            catch (Exception ex)
            {
                
                throw;
            }
            return strStructura.ToString();
        }

        [HttpPost]
        public ActionResult CerrarSesion(string respuesta)
        {
            object message = null;
            PageBase.reiniciarSesiones();
            FormsAuthentication.SignOut();
            message = new
            {
                respuesta = respuesta,
                link = VirtualPathUtility.ToAbsolute(Constantes.PaginaLogin)
            };
            return Json(message, JsonRequestBehavior.AllowGet);
        }

    }
}