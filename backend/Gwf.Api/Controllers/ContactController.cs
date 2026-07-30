using Gwf.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Gwf.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private static readonly List<ContactMessage> _messages = new();

    [HttpPost]
    public ActionResult<ContactResponse> Submit([FromBody] ContactMessage message)
    {
        if (string.IsNullOrWhiteSpace(message.Name) ||
            string.IsNullOrWhiteSpace(message.Email) ||
            string.IsNullOrWhiteSpace(message.Message))
        {
            return BadRequest(new ContactResponse
            {
                Success = false,
                Message = "Name, email, and message are required."
            });
        }

        _messages.Add(message);

        return Ok(new ContactResponse
        {
            Success = true,
            Message = "Thank you for reaching out! We'll get back to you soon."
        });
    }

    [HttpGet]
    public ActionResult<IEnumerable<ContactMessage>> GetAll()
    {
        // Demo endpoint — in production, protect this with authentication
        return Ok(_messages);
    }
}
