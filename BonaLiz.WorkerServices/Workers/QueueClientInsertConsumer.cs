using BonaLiz.Negocio.ViewModels;
using BonaLiz.RabbitMQ.Events;
using BonaLiz.WorkerServices.Workers;
using MassTransit;
using MassTransit.Metadata;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.WorkerServices.Workers
{
    public class QueueClientInsertConsumer(ILogger<CarrinhoItensViewModel> _logger) : IConsumer<CarrinhoItensViewModel>
    {
        public Task Consume(ConsumeContext<CarrinhoItensViewModel> context)
        {
            _logger.LogInformation("Received Client: {Text}", context.Message.CarrinhoId);
            return Task.CompletedTask;

        }
    }
}
