using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Technical.Test.Service.DbContext;

namespace Technical.Test.Service.Api
{
    public class ColourService : BaseService
    {
        public async Task<List<Colour>> GetColours()
        {
            using (var db = new TechTestEntities())
            {
                return await db.Colours.OrderBy(x => x.Name).ToListAsync();
            }
        }
    }
}