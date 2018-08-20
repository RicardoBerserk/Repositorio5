using System;
using System.Collections;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Web;

namespace PlaneamientoCCWeb.Utils
{
    public class SeguridadActive
    {
        public static string getDomainName()
        {
            return IPGlobalProperties.GetIPGlobalProperties().DomainName;
        }

        public static string getLDAPDomainName(string domainName)
        {
            StringBuilder sb = new StringBuilder();
            string[] dcItems = domainName.Split(".".ToCharArray());
            sb.Append("LDAP://");
            foreach (string item in dcItems)
            {
                sb.AppendFormat("DC={0},", item);
            }
            return sb.ToString().Substring(0, sb.ToString().Length - 1);
        }

        public static List<Directivas> GetUsersInGroup(string group)
        {
            List<Directivas> users = new List<Directivas>();
            string ldapDomainName = SeguridadActive.getLDAPDomainName(Constantes.Parametros.DominioSudameris);
            string domainName = ldapDomainName.Replace("LDAP://", string.Empty);
            List<string> groupMemebers = new List<string>();

            DirectoryEntry de = new DirectoryEntry(ldapDomainName);
            DirectorySearcher ds = new DirectorySearcher(de, "(objectClass=person)");

            ds.Filter = "(&(objectClass=group)(cn=" + group + "))";
            foreach (SearchResult result in ds.FindAll())
            {
                var dir = result.GetDirectoryEntry();
                var list = dir.Invoke("Members");
                IEnumerable entries = (IEnumerable)list;
                foreach (var entry in entries)
                {
                    DirectoryEntry member = new DirectoryEntry(entry);
                    if (member.SchemaClassName == "group")
                    {
                        List<Directivas> usersInGroup =
                            GetUsersInGroup(member.Properties["name"][0].ToString());
                        foreach (Directivas aduser in usersInGroup)
                        {
                            if (!users.ToDictionary(u => u.Name).ContainsKey(aduser.Name))
                            {
                                users.Add(aduser);
                            }
                        }
                    }
                    else
                    {
                        Directivas aduser = new Directivas(
                            (byte[])member.Properties["objectSid"][0],
                            member.Properties["name"][0].ToString(),
                            member.Properties["distinguishedName"][0].ToString(),
                            member.Properties["sAMAccountName"][0].ToString());
                        users.Add(aduser);
                    }
                }
            }
            return users;
        }


        public static string[] GetUser(string user, string pass)
        {
            string displayname = string.Empty; string mail = string.Empty;
            try
            {
                string dominio = string.Empty;
                string[] arrDominios = Constantes.Parametros.DominioSudameris.Split(';');
                foreach (var data in arrDominios)
                {
                    dominio = data;
                    try
                    {
                        List<Directivas> users = new List<Directivas>();
                        string ldapDomainName = SeguridadActive.getLDAPDomainName(dominio);
                        string domainName = ldapDomainName.Replace("LDAP://", string.Empty);
                        List<string> groupMemebers = new List<string>();

                        DirectoryEntry de = new DirectoryEntry(ldapDomainName, user, pass);
                        DirectorySearcher deSearch = new DirectorySearcher(de);

                        string[] properties = { "fullname" };
                        deSearch.SearchScope = SearchScope.Subtree;
                        deSearch.ReferralChasing = ReferralChasingOption.All;
                        deSearch.PropertiesToLoad.AddRange(properties);
                        deSearch.Filter = "(sAMAccountName=" + user + ")";

                        SearchResult result;
                        result = deSearch.FindOne();
                        DirectoryEntry directoryEntry = new DirectoryEntry();
                        directoryEntry = result.GetDirectoryEntry();

                        displayname = directoryEntry.Properties["displayname"].Value.ToString();
                        mail = directoryEntry.Properties["mail"].Value.ToString();
                    }
                    catch
                    {
                        displayname = string.Empty; mail = string.Empty;
                    }
                    if (!string.IsNullOrEmpty(displayname) && !string.IsNullOrEmpty(mail))
                    {
                        break;
                    }
                }
            }
            catch
            {
                displayname = string.Empty; mail = string.Empty;
            }

            string[] ar = { displayname, mail };
            return ar;
        }

        public static string[] GetUsuario(string user, string pass)
        {
            string displayname = string.Empty; string mail = string.Empty;

            var dominio = System.Net.NetworkInformation.IPGlobalProperties.GetIPGlobalProperties().DomainName;
            try
            {
                List<Directivas> users = new List<Directivas>();
                string ldapDomainName = SeguridadActive.getLDAPDomainName(dominio);
                string domainName = ldapDomainName.Replace("LDAP://", string.Empty);
                List<string> groupMemebers = new List<string>();

                DirectoryEntry de = new DirectoryEntry(ldapDomainName, user, pass);
                DirectorySearcher deSearch = new DirectorySearcher(de);

                string[] properties = { "fullname" };
                deSearch.SearchScope = SearchScope.Subtree;
                deSearch.ReferralChasing = ReferralChasingOption.All;
                deSearch.PropertiesToLoad.AddRange(properties);
                deSearch.Filter = "(sAMAccountName=" + user + ")";

                SearchResult result;
                result = deSearch.FindOne();
                DirectoryEntry directoryEntry = new DirectoryEntry();
                directoryEntry = result.GetDirectoryEntry();

                displayname = directoryEntry.Properties["displayname"].Value.ToString();
                mail = directoryEntry.Properties["mail"].Value.ToString();
            }
            catch
            {
                displayname = string.Empty; mail = string.Empty;
            }
            if (!string.IsNullOrEmpty(displayname) && !string.IsNullOrEmpty(mail))
            {
                //break;
            }
            string[] ar = { displayname, mail };
            return ar;
        }

        public static string[] GetUsuario2(string user, string pass)
        {
            string displayname = string.Empty; string mail = string.Empty;

            var dominio = System.Net.NetworkInformation.IPGlobalProperties.GetIPGlobalProperties().DomainName;

            try
            {
                List<Directivas> lstADUsers = new List<Directivas>();
                //List<Users> lstADUsers = new List<Users>();
                string DomainPath = "LDAP://DC=xxxx,DC=com";
                DirectoryEntry searchRoot = new DirectoryEntry(DomainPath); 
                DirectorySearcher search = new DirectorySearcher(searchRoot);
                search.Filter = "(&(objectClass=user)(objectCategory=person))";
                search.PropertiesToLoad.Add("samaccountname");
                search.PropertiesToLoad.Add("mail");
                search.PropertiesToLoad.Add("usergroup");
                search.PropertiesToLoad.Add("displayname");//first name
                SearchResult result;
                result = search.FindOne();
                DirectoryEntry directoryEntry = new DirectoryEntry();
                directoryEntry = result.GetDirectoryEntry();


                //SearchResultCollection resultCol = search.FindAll();

                //DirectoryEntry directoryEntry = new DirectoryEntry();
                //directoryEntry = result.GetDirectoryEntry(); //.GetDirectoryEntry();

                displayname = "jricardo";//directoryEntry.Properties["displayname"].Value.ToString();
                mail = "jricardo";//directoryEntry.Properties["mail"].Value.ToString();
                
                /*
                if (resultCol != null)
                {
                    for (int counter = 0; counter < resultCol.Count; counter++)
                    {
                        string UserNameEmailString = string.Empty;
                        result = resultCol[counter];
                        if (result.Properties.Contains("samaccountname") && 
                                 result.Properties.Contains("mail") && 
                            result.Properties.Contains("displayname"))
                        {
                            Directivas objSurveyUsers = new Directivas();

                            objSurveyUsers.Name = searchRoot.Properties["displayname"].Value.ToString();
                            objSurveyUsers.Email = (String)result.Properties["mail"][0] + 
                              "^" + (String)result.Properties["displayname"][0];
                            objSurveyUsers.UserName = (String)result.Properties["samaccountname"][0];
                            objSurveyUsers.DisplayName = (String)result.Properties["displayname"][0];
                            lstADUsers.Add(objSurveyUsers);
                        }
                        //displayname = directoryEntry.Properties["displayname"].Value.ToString();
                    }
                }
                //return lstADUsers;
                */
            }
            catch (Exception ex)
            {
                //displayname = string.Empty; mail = string.Empty;
                displayname = "jricardo"; mail = "jricardo";
            }


            //try
            //{
            //    List<Directivas> users = new List<Directivas>();
            //    string ldapDomainName = SeguridadActive.getLDAPDomainName(dominio);
            //    string domainName = ldapDomainName.Replace("LDAP://", string.Empty);
            //    List<string> groupMemebers = new List<string>();

            //    DirectoryEntry de = new DirectoryEntry(ldapDomainName, user, pass);
            //    DirectorySearcher deSearch = new DirectorySearcher(de);

            //    string[] properties = { "fullname" };
            //    deSearch.SearchScope = SearchScope.Subtree;
            //    deSearch.ReferralChasing = ReferralChasingOption.All;
            //    deSearch.PropertiesToLoad.AddRange(properties);
            //    deSearch.Filter = "(sAMAccountName=" + user + ")";

            //    SearchResult result;
            //    result = deSearch.FindOne();
            //    DirectoryEntry directoryEntry = new DirectoryEntry();
            //    directoryEntry = result.GetDirectoryEntry();

            //    displayname = directoryEntry.Properties["displayname"].Value.ToString();
            //    mail = directoryEntry.Properties["mail"].Value.ToString();
            //}
            //catch
            //{
            //    displayname = string.Empty; mail = string.Empty;
            //}


            if (!string.IsNullOrEmpty(displayname) && !string.IsNullOrEmpty(mail))
            {
                //break;
            }
            string[] ar = { displayname, mail };
            return ar;
        }

    }
}