namespace Technical.Test.Service
{
    public class ServiceError
    {
        public ServiceError()
        {
        }

        public ServiceError(string propertyName, string propertyMessage)
        {
            PropertyName = propertyName;
            PropertyMessage = propertyMessage;
        }

        public string PropertyName { get; set; }
        public string PropertyMessage { get; set; } 
    }
}