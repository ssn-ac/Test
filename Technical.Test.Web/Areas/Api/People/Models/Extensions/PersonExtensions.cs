using System.Collections.Generic;
using System.Linq;

namespace Technical.Test.Web.Areas.Api.People.Models.Extensions
{
    public static class PersonExtensions
    {
        public static IList<PersonJsonModel> ThenOrderColours(this IList<PersonJsonModel> list, bool desc = false)
        {
            foreach (var item in list)
            {
                item.OrderColoursInternal(desc);
            }

            return list;
        }

        public static PersonJsonModel ThenOrderColours(this PersonJsonModel model, bool desc = false)
        {
            return model.OrderColoursInternal(desc);
        }

        private static PersonJsonModel OrderColoursInternal(this PersonJsonModel model, bool desc = false)
        {
            model.Colours = desc ? model.Colours.OrderByDescending(x => x.Name).ToList() : model.Colours.OrderBy(x => x.Name).ToList();
            return model;
        }
    }
}