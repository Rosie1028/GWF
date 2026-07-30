using Gwf.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Gwf.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private static readonly List<OrderRequest> _orders = new();

    [HttpPost]
    public ActionResult<OrderResponse> PlaceOrder([FromBody] OrderRequest order)
    {
        if (string.IsNullOrWhiteSpace(order.CustomerName) ||
            string.IsNullOrWhiteSpace(order.CustomerEmail) ||
            order.Items.Count == 0)
        {
            return BadRequest(new OrderResponse
            {
                Success = false,
                Message = "Customer name, email, and at least one item are required."
            });
        }

        var total = order.Items.Sum(i => i.UnitPrice * i.Quantity);
        var orderId = Guid.NewGuid().ToString("N")[..8].ToUpper();

        _orders.Add(order);

        return Ok(new OrderResponse
        {
            Success = true,
            OrderId = orderId,
            Total = total,
            Message = $"Order {orderId} placed successfully! We'll send a confirmation to {order.CustomerEmail}."
        });
    }
}
