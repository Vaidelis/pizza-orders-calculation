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
            decimal roundedOrderPrice = Math.Round(orderPrice, 2);
            return Ok(roundedOrderPrice);
        }
    }
}
