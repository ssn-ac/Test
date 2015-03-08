using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Technical.Test.Service
{
    public class ModelValidation
    {
        public ModelValidationResult Validate(object model)
        {
            RegisterModelMetadata(model);
            var context = new ValidationContext(model, null, null);
            var result = new ModelValidationResult();
            result.IsValid = Validator.TryValidateObject(model, context, result.Errors, true);

            return result;
        }

        private static void RegisterModelMetadata(object model)
        {
            var modelType = model.GetType();
            var typeAttributes = System.Attribute.GetCustomAttributes(modelType);
            var modelMetadata = (MetadataTypeAttribute)typeAttributes.FirstOrDefault(x => x is MetadataTypeAttribute);

            if (modelMetadata == null) { return; }

            var provider = new AssociatedMetadataTypeTypeDescriptionProvider(modelType, modelMetadata.MetadataClassType);

            TypeDescriptor.AddProviderTransparent(provider, modelType);
        }
    }
}