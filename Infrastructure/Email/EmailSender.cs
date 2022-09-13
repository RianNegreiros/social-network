using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Infrastructure.Email
{
  public class EmailSender
    {
        private readonly IConfiguration _config;

    public EmailSender(IConfiguration config)
    {
      _config = config;
    }

    public async Task SendEmailAsync(string userEmail, string emailSubject, string message)
    {
        var client = new SendGridClient(_config["SendGrid:Key"]);
        var msg = new SendGridMessage
        {
            From = new EmailAddress(_config["Email"], _config["Sendgrid:User"]),
            Subject = emailSubject,
            PlainTextContent = message,
            HtmlContent = message
        };
        msg.AddTo(new EmailAddress(userEmail));
        msg.SetClickTracking(false, false);

        await client.SendEmailAsync(msg);
    }
  }
}