using Microsoft.EntityFrameworkCore;
using PizzaOrdersCalculation.Model;
using PizzaOrdersCalculation.Models;
using PizzaOrdersCalculation.Services;

namespace PizzaOrdersCalculation.Services
{
    public class PizzaService : IPizzaService
    {
        private readonly PizzaDbContext _context;
        public PizzaService()
        {
            var options = new DbContextOptionsBuilder<PizzaDbContext>()
                .UseInMemoryDatabase("PizzaDB")
                .Options;

            _context = new PizzaDbContext(options);
        }

        public async Task<IEnumerable<Pizza>> GetAllPizzas() =>
        await _context.Pizzas.ToListAsync();

        public IQueryable<OrderDetailDto> GetAllOrders()
        {
            return
                (from a in _context.OrderDetail
                 join b in _context.Orders on a.OrderId equals b.Id
                 join c in _context.Pizzas on b.PizzaId equals c.Id
                 select new OrderDetailDto
                 {
                     OrderPizzaName = c.Name,
                     OrderSize = c.Size,
                     OrderItemPrice = b.PizzaPrice,

                 }).AsQueryable();
        }

    }
}
