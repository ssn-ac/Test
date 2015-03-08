using Technical.Test.Web.Infastructure;

namespace Technical.Test.Web
{
    public class MapperConfig
    {
        public static void RegisterMappers()
        {
            WebMapper.RegisterMappings();
            AutoMapper.Mapper.AssertConfigurationIsValid();
        }
    }
}