using Gwf.Api.Data;
using Gwf.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Gwf.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetAll()
    {
        return Ok(ProductStore.Products);
    }

    [HttpGet("{id:int}")]
    public ActionResult<Product> GetById(int id)
    {
        var product = ProductStore.Products.FirstOrDefault(p => p.Id == id);
        if (product is null)
        {
            return NotFound(new { message = $"Product {id} not found." });
        }

        return Ok(product);
    }
}
