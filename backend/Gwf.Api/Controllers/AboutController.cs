using Gwf.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Gwf.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AboutController : ControllerBase
{
    [HttpGet]
    public ActionResult<FounderInfo> Get()
    {
        var founder = new FounderInfo
        {
            Name = "Rosy",
            Title = "Founder, The Wellbeing Growth & Freedom Movement",
            Bio = "I created GWF to share natural, handcrafted products that nurture wellbeing and inspire a life of growth and freedom. " +
                  "Every soap is made with intention — using organic ingredients and time-honored techniques.",
            Mission = "To empower people to choose natural, mindful products that support their wellbeing journey.",
            Vision = "A world where everyone has access to wholesome, artisanal goods that connect them to nature and themselves.",
            Values = new List<string>
            {
                "Natural ingredients",
                "Handcrafted with care",
                "Sustainable practices",
                "Community & connection",
                "Growth through wellbeing"
            }
        };

        return Ok(founder);
    }
}
