using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaOrdersCalculation.Model;

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
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var pizz = _context.Pizzas.SingleOrDefault(p => p.Id == id);

            if (pizz == null)
            {
                return NotFound("Pizza with the Id "+id+" does not exist");
            }
            _context.Pizzas.Remove(pizz);
            _context.SaveChanges();
            return Ok("Pizza with the Id "+id +" deleted successfully");
        }
        [HttpPost]
        public IActionResult AddPizza(Pizza pizza)
        {
            _context.Pizzas.Add(pizza);
            _context.SaveChanges();
            return Created("api/pizzas/" + pizza.Id, pizza);
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, Pizza pizza)
        {
            var pizz = _context.Pizzas.SingleOrDefault(p => p.Id == id);

            if (pizz == null)
            {
                return NotFound("Pizza with the Id " + id + " does not exist");
            }
            if(pizza.Name != null)
            {
                pizz.Name = pizza.Name;
            }
            if (pizza.Size != null)
            {
                pizz.Size = pizza.Size;
            }
            if (pizza.Price != 0)
            {
                pizz.Price = pizza.Price;
            }

            _context.Update(pizz);
            _context.SaveChanges();
            return Ok("Pizza with the Id" + id + "Updated successfully");
        }
    }
}
