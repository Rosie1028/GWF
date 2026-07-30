using Gwf.Api.Models;

namespace Gwf.Api.Data;

public static class ProductStore
{
    public static readonly List<Product> Products = new()
    {
        new Product
        {
            Id = 1,
            Name = "Lavender Calm Soap",
            Description = "Handcrafted soap with organic lavender and shea butter. Gentle on skin, calming for the senses.",
            Price = 12.00m,
            ImageUrl = "/images/products/lavender-calm-soap.png",
            Category = "Artisanal Soap",
            InStock = true
        },
        new Product
        {
            Id = 2,
            Name = "Eucalyptus Mint Soap",
            Description = "Refreshing blend of eucalyptus and peppermint oils. Invigorates body and mind.",
            Price = 12.00m,
            ImageUrl = "/images/products/eucalyptus-mint-soap.png",
            Category = "Artisanal Soap",
            InStock = true
        },
        new Product
        {
            Id = 3,
            Name = "Honey Oat Gentle Soap",
            Description = "Nourishing soap with raw honey and colloidal oatmeal. Perfect for sensitive skin.",
            Price = 14.00m,
            ImageUrl = "/images/products/honey-oat-soap.png",
            Category = "Artisanal Soap",
            InStock = true
        },
        new Product
        {
            Id = 4,
            Name = "Wellness Gift Set",
            Description = "A curated set of three artisanal soaps plus a natural loofah. The perfect gift for self-care.",
            Price = 38.00m,
            ImageUrl = "/images/products/wellness-gift-set.png",
            Category = "Gift Set",
            InStock = true
        }
    };
}
