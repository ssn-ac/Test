using AutoMapper;
using Technical.Test.Service.DbContext;
using Technical.Test.Web.Areas.Api.Colours.Models;
using Technical.Test.Web.Infastructure.Mapper;

namespace Technical.Test.Web.Areas.Api.People.Models
{
    public class PeopleMapper : IMapper
    {
        public void Register()
        {
            Mapper.CreateMap<Person, PersonJsonModel>()
                .ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.PersonId)).ReverseMap();

            Mapper.CreateMap<PersonJsonModel, Person>()
                .ForMember(dest => dest.PersonId, opts => opts.MapFrom(src => src.Id));

            Mapper.CreateMap<Technical.Test.Service.DbContext.Colour, ColourJsonModel>()
             .ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.ColourId));

            Mapper.CreateMap<ColourJsonModel, Technical.Test.Service.DbContext.Colour>()
                .ForMember(dest => dest.ColourId, opts => opts.MapFrom(src => src.Id))
                .Ignore(dest => dest.IsEnabled)
                .Ignore(dest => dest.People); 
        }
    }
}