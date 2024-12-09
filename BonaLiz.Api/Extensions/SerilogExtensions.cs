using Serilog;
using Serilog.Events;
using Serilog.Exceptions;
using Serilog.Filters;

namespace BonaLiz.Api.Extensions
{
	public static class SerilogExtensions
	{
		public static void AddSerilog(string applicationName) => Log.Logger = new LoggerConfiguration()
			.MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Information)
			.MinimumLevel.Override("Error", LogEventLevel.Error)
			.Enrich.FromLogContext()
			.Enrich.WithExceptionDetails()
			.Enrich.WithProperty("ApplicationName", $"{applicationName}")
			.Filter.ByExcluding(Matching.FromSource("Microsoft.AspNetCore.StaticFiles"))
			.WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3} {Message:lj} {Properties:j}{NewLine}{Exception}]")
			.WriteTo.File("log-.txt", rollingInterval: RollingInterval.Day)
			.CreateLogger();

	}
}
