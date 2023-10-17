using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaOrdersCalculation.Model;
using PizzaOrdersCalculation.Models;

namespace PizzaOrdersCalculation.Controllers
{
    [Route("[controller]")]
    
    public class ToppingsController : ControllerBase
    {
        private readonly PizzaDbContext _context;

        public ToppingsController(PizzaDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public List<Toppings> GetToppings()
        {
            return _context.Toppings.ToList();
        }
    }
}