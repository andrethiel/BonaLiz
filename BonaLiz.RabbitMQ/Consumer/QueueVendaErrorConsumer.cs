using BonaLiz.Negocio.ViewModels;
using MassTransit;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.RabbitMQ.Consumer
{
    public class QueueVendaErrorConsumer(ILogger<QueueVendaErrorConsumer> _logger) : IConsumer<Fault<CarrinhoViewModel>>
    {
        public async Task Consume(ConsumeContext<Fault<CarrinhoViewModel>> context)
        {
            var failedMessage = context.Message.Message;
            var exceptionMessage = context.Message.Exceptions.FirstOrDefault()?.Message;

            _logger.LogCritical("🚨 Pedido falhou permanentemente. CarrinhoId: {CarrinhoId}, Erro: {Erro}",
                failedMessage.CarrinhoId,
                exceptionMessage);

            // Aqui você pode: salvar no banco, enviar e-mail, etc.

            await Task.CompletedTask;
        }
    }
}
