using AutoMapper;
using Technical.Test.Web.Areas.Api.Colours.Models;
using Technical.Test.Web.Infastructure.Mapper;

namespace Technical.Test.Web.Areas.Api.Colours
{
    public class ColourMapper : IMapper
    {
        public void Register()
        {
            Mapper.CreateMap<Technical.Test.Service.DbContext.Colour, ColourJsonModel>()
                .ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.ColourId));

            Mapper.CreateMap<ColourJsonModel,Technical.Test.Service.DbContext.Colour>()
                .ForMember(dest => dest.ColourId, opts => opts.MapFrom(src => src.Id))
                .Ignore(dest => dest.IsEnabled)
                .Ignore(dest => dest.People); 
        }
    }
}