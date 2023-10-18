using Microsoft.AspNetCore.Mvc;
using PizzaOrdersCalculation.Models;

namespace PizzaOrdersCalculation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DiscountCalculationController : Controller
    {
        [HttpPost("orderPrice")]
        public ActionResult<decimal> CalculateOrderPrice([FromBody] OrderDiscountCalculationRequest request)
        {
            decimal orderPrice = (request.PizzaPrice + request.ToppingsPrice) * request.OrderDiscount;
            return Ok(orderPrice);
        }
    }
}
