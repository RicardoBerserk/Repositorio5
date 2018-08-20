using PlaneamientoCCWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PlaneamientoCCWeb.Controllers
{
    public class DefaultController : Controller
    {
        //
        // GET: /Default/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Error()
        {
            return View();
        }




        [HttpGet]
        //public List<NavbarItem> GetMenuDetails()
        public JsonResult GetMenuDetails()
        {
            var topNav = new List<NavbarItem>();
            topNav.Add(new NavbarItem() { Id = 1, action = "Regularizacion1", nameOption = "About", controller = "Home", isParent = false, parentId = 0 });
            topNav.Add(new NavbarItem() { Id = 2, action = "Autorizacion", nameOption = "Contact", controller = "Home", isParent = false, parentId = 0 });
            // drop down Menu 
            topNav.Add(new NavbarItem() { Id = 3, action = "Regularizacion", nameOption = "Reports", controller = "ReportGen", isParent = true, parentId = 0 });
            topNav.Add(new NavbarItem() { Id = 4, action = "dashboard", nameOption = "Overall Summary", controller = "ReportGen", isParent = false, parentId = 3 });
            topNav.Add(new NavbarItem() { Id = 5, action = "dashboard", nameOption = "Today Report", controller = "ReportGen", isParent = false, parentId = 3 });
            topNav.Add(new NavbarItem() { Id = 6, action = "Regularizacion2", nameOption = "Month Report", controller = "ReportGen", isParent = false, parentId = 3 });
            // End drop down Menu
            topNav.Add(new NavbarItem() { Id = 7, action = "Regularizacion1", nameOption = "Other action", controller = "Home", isParent = false, parentId = 0 });

            topNav.Add(new NavbarItem() { Id = 8, action = "dashboard", nameOption = "Other action", controller = "Home", isParent = false, parentId = 1 });
            topNav.Add(new NavbarItem() { Id = 9, action = "Regularizacion2", nameOption = "Other action", controller = "Home", isParent = false, parentId = 8 });
            topNav.Add(new NavbarItem() { Id = 10, action = "Regularizacion", nameOption = "Other action", controller = "Home", isParent = false, parentId = 9 });
            topNav.Add(new NavbarItem() { Id = 11, action = "Regularizacion", nameOption = "Other action", controller = "Home", isParent = false, parentId = 8 });

            var query = (from A in topNav
                         select new
                         {
                             A.Id,
                             A.parentId,
                             A.nameOption,
                             A.action,
                             A.controller
                         }).ToList();

            List<NavbarItem> MenuList = new List<NavbarItem>();

            query.ToList().ForEach(rec =>
            {
                MenuList.Add(new NavbarItem
                {
                    Id = rec.Id,
                    parentId = rec.parentId,
                    nameOption = rec.nameOption.ToString(),
                    action = rec.action,
                    controller = rec.controller
                });
            });
            //return MenuList;
            return Json(MenuList, JsonRequestBehavior.AllowGet);
        }

    }
}