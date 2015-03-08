using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Technical.Test.Service
{
    public abstract class BaseService
    {
        private readonly ModelValidation _validator;

        protected BaseService()
        {
            _validator = new ModelValidation();
        }

        protected void Validate<T>(T entity, IServiceResult result)
        {
            result.Update(_validator.Validate(entity));
        }
    }
}
