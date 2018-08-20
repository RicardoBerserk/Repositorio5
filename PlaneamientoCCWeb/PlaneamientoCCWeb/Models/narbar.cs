using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlaneamientoCCWeb.Models
{
    public class narbar
    {

    }

    public class NavbarItem
    {
        public int Id { get; set; }
        public string nameOption { get; set; }
        public string controller { get; set; }
        public string action { get; set; }
        public bool havingImageClass { get; set; }
        public string cssClass { get; set; }
        public int parentId { get; set; }
        public bool isParent { get; set; }
    }
    public class Navbar
    {
        public IEnumerable<NavbarItem> NavbarTop()
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
            return topNav;
        }
    }
}