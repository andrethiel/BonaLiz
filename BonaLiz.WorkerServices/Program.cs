using BonaLiz.RabbitMQ;
using BonaLiz.WorkerServices;
using BonaLiz.WorkerServices.Workers;
using BonaLiz.RabbitMQ.MassTransit;
using MassTransit;

try
{
    var builder = Host.CreateApplicationBuilder(args);

    var host = Host.CreateDefaultBuilder(args)
        .ConfigureServices((context, collection) =>
        {
            collection.AddMassTransit(x =>
            {
                x.AddDelayedMessageScheduler();
                x.AddConsumer<QueueClientInsertConsumer>();

                x.SetKebabCaseEndpointNameFormatter();

                x.UsingRabbitMq((ctx, cfg) =>
                {
                    cfg.Host(context.Configuration.GetConnectionString("RabbitMq"));
                    cfg.ConfigureEndpoints(ctx);
                });
            });
            collection.AddCronJob<TimerJob>(c => c.CronExpression = @"*/1 * * * *");
        })
        .Build();
    await host.RunAsync();
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message, "Host terminated unexpectedly");
}

