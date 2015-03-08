using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Xml;

namespace Technical.Test.Service
{
    public class ServiceResult<T> : IServiceResult where T : class
    {
        #region .ctor

        public ServiceResult()
        {
            Success = true;
            ServiceErrors = new List<ServiceError>();
        }

        public ServiceResult(T model) : this()
        {
            Entity = model;
        }

        #endregion

        public bool Success { get; set; }
        public Exception Exception { get; set; }
        public List<ServiceError> ServiceErrors { get; set; }
        public T Entity { get; set; }

        public void AddException(Exception exception)
        {
            Success = false;
            Exception = exception;
            AddModelError("Unhandled exception occurred.");
        }

        public void Update(ModelValidationResult validationResult)
        {
            if (validationResult.IsValid)
            {
                return;
            }

            Success = false;

            foreach (var error in validationResult.Errors)
            {
                AddModelError(GetErrorFieldName(error), error.ErrorMessage);
            }
        }

        public void AddModelError(string errorMessage)
        {
            AddModelError(string.Empty, errorMessage);
        }

        public void AddModelError(string fieldName, string errorMessage)
        {
            Success = false;

            var error = new ServiceError(fieldName, errorMessage);

            if (ServiceErrors.Any(o => o.PropertyName == fieldName && o.PropertyMessage == errorMessage))
            {
                // don't add duplicate error messages
                return;
            }

            ServiceErrors.Add(error);
        }

        public void ClearServiceErrors()
        {
            ServiceErrors.Clear();
        }

        public bool HasErrors
        {
            get { return !Success; }
        }

        private static string GetErrorFieldName(ValidationResult validationResult)
        {
            var result = validationResult.MemberNames.FirstOrDefault() ?? "";
            return result;
        }
    }
}
