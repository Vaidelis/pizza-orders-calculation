using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaOrdersCalculation.Model;
using PizzaOrdersCalculation.Models;

namespace PizzaOrdersCalculation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PizzaController : ControllerBase
    {
        private readonly PizzaDbContext _context;

        public PizzaController(PizzaDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public List<Pizza> GetPizzas()
        {
            return _context.Pizzas.ToList();
        }
        [HttpGet("{id}")]
        public Pizza GetPizzaById(int id) 
        {
            return _context.Pizzas.SingleOrDefault(e => e.Id == id);
        }
    }
}
