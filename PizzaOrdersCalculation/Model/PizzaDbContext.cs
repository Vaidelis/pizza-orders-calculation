using Microsoft.EntityFrameworkCore;

namespace PizzaOrdersCalculation.Model
{
    public class PizzaDbContext : DbContext
    {
        protected override void OnConfiguring
       (DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "PizzaDb");
        }

        public DbSet<Pizza> Pizzas { get; set; }
    }
}
