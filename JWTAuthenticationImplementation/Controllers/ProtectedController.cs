using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JWTAuthenticationImplementation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Requires JWT
    public class ProtectedController : ControllerBase
    {
        [HttpGet("data")]
        public IActionResult GetProtectedData()
        {
            return Ok("This is protected data!");
        }
    }
}
