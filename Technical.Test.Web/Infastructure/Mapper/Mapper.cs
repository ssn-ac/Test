using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Technical.Test.Web.Infastructure.Mapper
{
    public class Register
    {
        public static void Maps<T>()
        {
            var mappings = GetMaps<T>();

            foreach (var map in mappings)
            {
                map.Register();
            }
        }

        private static IEnumerable<IMapper> GetMaps<T>()
        {
            var mappings = Assembly.GetAssembly(typeof(T))
                                   .GetTypes()
                                   .Where(t => t.GetInterfaces().Contains(typeof(IMapper)))
                                   .Select(t => Activator.CreateInstance(t) as IMapper);
            return mappings;
        }
    }
}