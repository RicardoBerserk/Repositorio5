using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace PlaneamientoCCWeb.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new StyleBundle("~/bundles/boostrap")
            .Include("~/Content/bootstrap.css")
            .Include("~/Content/angucomplete-alt.css")
            .Include("~/Content/jquery-ui.css")
            .Include("~/Content/loading-bar.css"));
                //.IncludeDirectory("~/Content/css", "*.css"));

            bundles.Add(new StyleBundle("~/bundles/css")
                .Include("~/Content/site.css"));

            bundles.Add(new StyleBundle("~/bundles/PlaneamientoStyles")
            .IncludeDirectory("~/Content", "*.css", true));

            bundles.Add(new ScriptBundle("~/bundles/bootstrapjs")
                 .Include("~/Scripts/jquery.js")
                 .Include("~/Scripts/jquery-1.9.1.js")
                 .Include("~/Scripts/bootstrap.js")
                 .Include("~/Scripts/jquery-ui.js")
                 .Include("~/Scripts/bootbox.js"));
                 //.Include("~/Content/bootstrap/js/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular")
                .Include("~/Scripts/angular.js")
                .Include("~/Scripts/loading-bar.min.js")
                .IncludeDirectory("~/Scripts/modules", "*.js", true));

            bundles.Add(new ScriptBundle("~/bundles/app")
                .Include("~/app/app.js")
                .Include("~/app/app.routes.js")
                .Include("~/app/app.controller.js")
                .IncludeDirectory("~/app/shared", "*.js", true)
                .IncludeDirectory("~/app/public", "*.js", true)
                .IncludeDirectory("~/app/private", "*.js", true)
                );


            bundles.Add(new DynamicFolderBundle("js", "*.js", false, new JsMinify()));
            bundles.Add(new DynamicFolderBundle("css", "*.css", false, new CssMinify()));

#if DEBUG
            BundleTable.EnableOptimizations = false;
#else
            BundleTable.EnableOptimizations = true;
#endif
        }
    }
}