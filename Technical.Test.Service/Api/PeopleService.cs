using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Technical.Test.Service.DbContext;

namespace Technical.Test.Service
{
    public class PeopleService : BaseService
    {
        public async Task<List<Person>> GetPeople()
        {
            using (var db = new TechTestEntities())
            {
                return await db.People
                    .Include("Colours")
                    .OrderBy(x => x.FirstName)
                    .ThenBy(x => x.LastName)
                    .ToListAsync();
            }
        }

        public async Task<Person> GetPerson(int id)
        {
            using (var db = new TechTestEntities())
            {
                return await db.People
                    .Include("Colours")
                    .Where(p => p.PersonId == id)
                    .SingleOrDefaultAsync();
            }
        }

        public async Task<ServiceResult<Person>> Update(Person model)
        {
            var result = new ServiceResult<Person>();

            Validate(model, result);

            if (result.HasErrors) return result;

            using (var db = new TechTestEntities())
            {
                await GetPerson(result, db, model);
                UpdatePerson(result, model);
                await UpdateColours(result, db, model);
                 
                await db.SaveChangesAsync();
            }
            return result;
        }

        private async Task UpdateColours(ServiceResult<Person> result, TechTestEntities db, Person model)
        {
            foreach (var colour in result.Entity.Colours.ToList())
            {
                result.Entity.Colours.Remove(colour);
            }
            
            var selectedIds = model.Colours.Select(x => x.ColourId).ToList();
            var selectedColours = await db.Colours.Where(x => selectedIds.Contains(x.ColourId)).ToListAsync();

            foreach (var selectedColour in selectedColours)
            {
                result.Entity.Colours.Add(selectedColour);
            }
        }

        private static async Task<ServiceResult<Person>> GetPerson(ServiceResult<Person> result, TechTestEntities db, Person model)
        {
            result.Entity  = await  db.People
                .Include("Colours")
                .Where(p => p.PersonId == model.PersonId)
                .SingleOrDefaultAsync();

            if (result.Entity == null)
                result.AddModelError("Person not found.");

            return result;
        }

        private static void UpdatePerson(ServiceResult<Person> result, Person model)
        {
            result.Entity.IsAuthorised = model.IsAuthorised;
            result.Entity.IsEnabled = model.IsEnabled;
        }
    }
}
