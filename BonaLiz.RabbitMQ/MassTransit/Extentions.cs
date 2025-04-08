using BonaLiz.RabbitMQ.Consumer;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BonaLiz.RabbitMQ.MassTransit
{
    public static class Extentions
    {
        public static void AddMassTransitPublisher(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddMassTransit(bus =>
            {
                bus.AddConsumer<QueueVendaInsertConsumer>();
                bus.AddConsumer<QueueVendaErrorConsumer>();

                bus.UsingRabbitMq((ctx, busConfigurator) =>
                {
                    busConfigurator.Message<QueueVendaInsertConsumer>(x =>
                    {
                        x.SetEntityName("bonaliz-venda-insert");
                    });

                    busConfigurator.Host(configuration.GetConnectionString("RabbitMq"));
                    busConfigurator.ReceiveEndpoint("bonaliz-venda-insert", e =>
                    {
                        e.ConfigureConsumer<QueueVendaInsertConsumer>(ctx);
                        e.UseDelayedRedelivery(r => r.Intervals(TimeSpan.FromSeconds(10), TimeSpan.FromSeconds(20), TimeSpan.FromSeconds(30)));
                        e.UseMessageRetry(r => r.Interval(3, TimeSpan.FromSeconds(5)));
                    });

                    busConfigurator.ReceiveEndpoint("bonaliz-venda-insert_error", e =>
                    {
                        e.ConfigureConsumer<QueueVendaErrorConsumer>(ctx);
                    });
                });

                
            });

            services.Configure<MassTransitHostOptions>(options =>
            {
                options.WaitUntilStarted = true;
                options.StartTimeout = TimeSpan.FromSeconds(30);
                options.StopTimeout = TimeSpan.FromMinutes(1);
            });
        }
    }
}
