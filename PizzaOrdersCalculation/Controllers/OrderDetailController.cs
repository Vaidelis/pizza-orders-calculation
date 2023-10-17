using Microsoft.AspNetCore.Mvc;
using PizzaOrdersCalculation.Model;
using PizzaOrdersCalculation.Models;

namespace PizzaOrdersCalculation.Controllers
{
    [Route("[controller]")]
    public class OrderDetailController : Controller
    {
        private readonly PizzaDbContext _context;

        public OrderDetailController(PizzaDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public List<OrderDetail> GetOrderDetail()
        {
            return _context.OrderDetail.ToList();
        }
        [HttpPost]
        public async Task<IActionResult> CreateOrderDetaill([FromBody] OrderDetail orderDetail)
        {
            try
            {
                _context.OrderDetail.Add(orderDetail);
                await _context.SaveChangesAsync();

                return Ok("Order detail created successfully");
            }
            catch (Exception ex)
            {
                // Handle any errors or exceptions that may occur during order detail creation
                // Return an appropriate error response (e.g., status code 500) in case of an error
                return StatusCode(500, "Error creating order detail");
            }
        }
    }
}
