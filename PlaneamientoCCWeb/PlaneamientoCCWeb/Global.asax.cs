using PlaneamientoCCWeb.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace PlaneamientoCCWeb
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            //BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        //protected void Application_Error(object sender, EventArgs e)
        //{
        //    var exception = Server.GetLastError();
        //    Server.ClearError();

        //    Response.Redirect("/Default/Error");
        //}

        protected void Application_Error(object sender, EventArgs e)
        {
            //Exception exception = Server.GetLastError();
            //Response.Clear();

            //HttpException httpException = exception as HttpException;

            //if (httpException != null)
            //{
            //    string action = "";
            //    switch (httpException.GetHttpCode())
            //    {
            //        case 404:
            //            action = "Index";
            //            break;
            //        case 500:
            //            action = "HttpError500";
            //            break;
            //        default:
            //            action = "General";
            //            break;
            //    }

            //    Server.ClearError();

            //    Response.Redirect(String.Format("~/#!/home"));
            //}
        }


        protected void Application_Stop()
        {
            // Code that runs when a new session is started
            PageBase.reiniciarSesiones();
            Session.Abandon();
            Session.RemoveAll();
        }
        void Session_End(object sender, EventArgs e)
        {
            // Code that runs when a new session is started
            PageBase.reiniciarSesiones();
            Session.Abandon();
            Session.RemoveAll();
        }
        void Session_Start(object sender, EventArgs e)
        {
            // Code that runs when a new session is started
            PageBase.reiniciarSesiones();

        }
    }
}
