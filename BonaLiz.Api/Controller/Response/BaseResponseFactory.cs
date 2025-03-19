namespace BonaLiz.Api.Controller.Response
{
    public static class BaseResponseFactory
    {
        public static BaseResponse<T> Success<T>(T data, string message = "Operação realizada com sucesso")
        => new BaseResponse<T>(data, message);

        public static BaseResponse<T> Fail<T>(string message)
            => new BaseResponse<T>(message);
    }
}
