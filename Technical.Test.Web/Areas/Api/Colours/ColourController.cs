using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Technical.Test.Service.Api;
using Technical.Test.Web.Areas.Api.Colours.Models;
using Technical.Test.Web.Infastructure.Mapper;

namespace Technical.Test.Web.Areas.Api.Colours
{
    [RoutePrefix("api/colours")]
    public class ColourController : ApiController
    {
        private readonly ColourService _colourService;

        public ColourController()
        {
            _colourService = new ColourService();
        }

        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            var data = await _colourService.GetColours();

            return Ok(data.MapTo<IList<ColourJsonModel>>());
        }
    }
}
