using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;

namespace PlaneamientoCCWeb.Utils
{
    public class Directivas
    {
        public byte[] Sid { get; set; }
        public string Name { get; set; }
        public string DistinguishedName { get; set; }
        public string SAMAccountName { get; set; }

        public int RoleType { get; set; }

        public Directivas(byte[] sid, string name,
            string distinguishedName, string sAMAccountName)
        {
            Sid = sid;
            Name = name;
            DistinguishedName = distinguishedName;
            SAMAccountName = sAMAccountName;
        }

        public string sIDtoString()
        {
            SecurityIdentifier sid = new SecurityIdentifier(Sid, 0);
            return sid.ToString();
        }
    }
}