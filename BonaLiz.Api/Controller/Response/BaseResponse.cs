using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.Api.Controller.Response
{
    public class BaseResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public T? Data { get; set; }

        public BaseResponse(T data, string message = "Operação realizada com sucesso")
        {
            Success = true;
            Message = message;
            Data = data;
        }

        public BaseResponse(string message)
        {
            Success = false;
            Message = message;
            Data = default;
        }
    }
}
