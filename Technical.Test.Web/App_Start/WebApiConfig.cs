using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using Newtonsoft.Json.Serialization;

namespace Technical.Test.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            RegisterFormatters(config);
            RegisterRoutes(config);
            Initialise(config);    
        }

        private static void RegisterFormatters(HttpConfiguration config)
        {
            RemoveXmlFormatter(config);
            AddJsonFormatter(config);
        }

        private static void RemoveXmlFormatter(HttpConfiguration config)
        {
            var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);
        }

        private static void RegisterRoutes(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
        }

        private static void AddJsonFormatter(HttpConfiguration config)
        {
            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();

            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        }

        private static void Initialise(HttpConfiguration config)
        {
            config.EnsureInitialized();
        }
    }
}
