using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Activities;
using FluentValidation.AspNetCore;
using API.Middleware;
using API.Extensions;
using Microsoft.AspNetCore.Identity;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using API.SignalR;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddControllers();

// Add services to the container.

builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
}).AddFluentValidation(config => {
    config.RegisterValidatorsFromAssemblyContaining<Create>();
});

builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

app.UseXContentTypeOptions();
app.UseReferrerPolicy(opt => opt.NoReferrer());
app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
app.UseXfo(opt => opt.Deny());
app.UseCsp(opt => opt
    .BlockAllMixedContent()
    .StyleSources(s => s.Self().CustomSources(
        "https://fonts.googleapis.com",
        "sha256-w8jhbLaiEDfNH+wnu6yJWThCr/0XvCWHx2F1xb1r/3U=",
        "sha256-ma5XxS1EBgt17N22Qq31rOxxRWRfzUTQS1KOtfYwuNo=",
        "sha256-2fhzhndSLpcJjbxwgHh3IdzaIg+KMgz9uOg6h5HWqRI="
    ))
    .FontSources(s => s.Self().CustomSources(
        "https://fonts.gstatic.com", "data:"
    ))
    .FormActions(s => s.Self())
    .FrameAncestors(s => s.Self())
    .ImageSources(s => s.Self().CustomSources(
        "https://res.cloudinary.com",
        "https://www.facebook.com",
        "https://scontent.fbhz2-1.fna.fbcdn.net",
        "data:"
    ))
    .ScriptSources(s => s.Self().CustomSources(
        "https://connect.facebook.net",
        "sha256-ma5XxS1EBgt17N22Qq31rOxxRWRfzUTQS1KOtfYwuNo=",
        "sha256-+ZldBJE2bvpCIFmaInRZAIT19Nvm9S0SRWYV7zqaut8="
    ))
);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.Use(async (context, next) =>
    {
        context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
        await next.Invoke();
    });
}

app.UseRouting();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints => 
{
    endpoints.MapControllers();
    endpoints.MapHub<ChatHub>("/chat");
    endpoints.MapFallbackToController("Index", "Fallback");
});

using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

await app.RunAsync();
