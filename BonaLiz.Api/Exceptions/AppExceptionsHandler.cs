using Microsoft.AspNetCore.Diagnostics;

namespace BonaLiz.Api.Exceptions
{
    public class AppExceptionsHandler : IExceptionHandler
    {
        public ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
