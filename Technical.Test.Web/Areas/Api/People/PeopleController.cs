
using System.Collections.Generic;
using Technical.Test.Web.Infastructure;
using System.Threading.Tasks;
using System.Web.Http;
using Technical.Test.Service;
using Technical.Test.Service.DbContext;
using Technical.Test.Web.Areas.Api.People.Models;
using Technical.Test.Web.Areas.Api.People.Models.Extensions;
using Technical.Test.Web.Infastructure.Mapper;

namespace Technical.Test.Web.Areas.Api.People
{
     [RoutePrefix("api/people")]
    public class PeopleController : ApiController
    {
        private readonly PeopleService _peopleService;

        #region .ctor
        public PeopleController()
        {
            _peopleService = new PeopleService();
        }
        #endregion

        [Route("")]
        public async Task<IHttpActionResult> GetPeople()
        {
            var people = await _peopleService.GetPeople();
            return Ok(people.MapTo<IList<PersonJsonModel>>().ThenOrderColours());
        }

        [Route("{id}")]
        public async Task<IHttpActionResult> Get(int id)
        {
            var people = await _peopleService.GetPerson(id);
            return Ok( people.MapTo<PersonJsonModel>().ThenOrderColours());
        }

        [Route("{id}")]
        public async Task<IHttpActionResult> Put(PersonJsonModel model)
        {
            var person = model.MapTo<Person>();
            var result = await _peopleService.Update(person);

            if (result.Success)
                return Ok(result.Entity.MapTo<PersonJsonModel>().ThenOrderColours());

            ModelState.AddModelError(result.ServiceErrors);

            return BadRequest(ModelState);
        }
    }
}
