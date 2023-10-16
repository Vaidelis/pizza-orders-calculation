using PizzaOrdersCalculation.Model;
using PizzaOrdersCalculation.Models;

namespace PizzaOrdersCalculation.Services
{
    public interface IPizzaService
    {
        Task<IEnumerable<Pizza>> GetAllPizzas();
        IQueryable<OrderDetailDto> GetAllOrders();
    }
}
