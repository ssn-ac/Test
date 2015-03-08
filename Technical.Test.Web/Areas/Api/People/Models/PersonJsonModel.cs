using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Technical.Test.Web.Areas.Api.Colours.Models;

namespace Technical.Test.Web.Areas.Api.People.Models
{
    public class PersonJsonModel
    {
        public PersonJsonModel()
        {
            Colours = new List<ColourJsonModel>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsAuthorised { get; set; }
        public bool IsValid { get; set; }
        public bool IsEnabled { get; set; }
        public IList<ColourJsonModel> Colours { get; set; }
    }
}