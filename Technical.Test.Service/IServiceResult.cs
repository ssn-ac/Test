using System;

namespace Technical.Test.Service
{
    public interface IServiceResult
    {
        void AddException(Exception exception);
        void Update(ModelValidationResult validationResult);
        void AddModelError(string errorMessage);
        void AddModelError(string fieldName, string errorMessage);
        void ClearServiceErrors();
        bool HasErrors { get; }
    }
}