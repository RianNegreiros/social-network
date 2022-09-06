using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API;

public class AppDbInitializer
{
    public static void Seed(IApplicationBuilder applicationBuilder)
    {
        using var serviceScope = applicationBuilder.ApplicationServices.CreateScope();
        try
        {
            var context = serviceScope.ServiceProvider.GetRequiredService<DataContext>();
            context.Database.Migrate();
            context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            var logger = serviceScope.ServiceProvider.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occured during migration");
        }
    }
}