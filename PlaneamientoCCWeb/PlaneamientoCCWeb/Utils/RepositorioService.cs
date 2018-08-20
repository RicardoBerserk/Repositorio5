using System;
using System.Web;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;


namespace PlaneamientoCCWeb.Utils
{
    public class RepositorioService
    {

        //Install-Package Microsoft.AspNet.WebApi.Client -Version 5.2.2
       public HttpClient Client { get; set; }

       public RepositorioService()  
       {  
           Client = new HttpClient();
           Client.BaseAddress = new Uri(ConfigurationManager.AppSettings["WebApiUrl"].ToString());  
       }  
       public HttpResponseMessage GetResponse(string url)  
       {  
           return Client.GetAsync(url).Result;  
       }  
       public HttpResponseMessage PutResponse(string url,object model)  
       {  
           return Client.PutAsJsonAsync(url, model).Result;  
       }  
       public HttpResponseMessage PostResponse(string url, object model)  
       {  
           return Client.PostAsJsonAsync(url,model).Result;  
       }  
       public HttpResponseMessage DeleteResponse(string url)  
       {  
           return Client.DeleteAsync(url).Result;  
       }  

         //using (var client = new HttpClient())
         //    {
         //        client.BaseAddress = new Uri("http://localhost:58745");
         //        client.DefaultRequestHeaders.Accept.Clear();
         //        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
         //        var response = client.GetAsync("api/values/10").Result;
         //        if (response.IsSuccessStatusCode)
         //        {
         //            string responseString = response.Content.ReadAsStringAsync().Result;
         //        }
         //    }


    }
}