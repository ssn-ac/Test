using System.Collections.Generic;
using System.Web.Http.ModelBinding;
using Technical.Test.Service;

namespace Technical.Test.Web.Infastructure
{
    public static class ModelStateExtensions
    {
        public static void AddModelError(this ModelStateDictionary modelState, IList<ServiceError> errors)
        {
            foreach (var error in errors)
            {
                modelState.AddModelError(error.PropertyName, error.PropertyMessage);
            }
        }
    }
}