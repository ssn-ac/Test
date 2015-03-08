using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Technical.Test.Web.Infastructure.Mapper;

namespace Technical.Test.Web.Infastructure
{
    public class WebMapper
    {
        public static void RegisterMappings()
        {
            Register.Maps<WebMapper>();
        }   
    }
}