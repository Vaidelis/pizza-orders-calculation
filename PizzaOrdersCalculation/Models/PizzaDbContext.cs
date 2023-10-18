using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using PizzaOrdersCalculation.Database;
using PizzaOrdersCalculation.Models;

namespace PizzaOrdersCalculation.Model
{
    public class PizzaDbContext : DbContext
    {
        public PizzaDbContext(DbContextOptions<PizzaDbContext> options) : base(options)
        {
            this.EnsureSeedData();
        }

        public DbSet<Pizza> Pizzas { get; set; }
        public DbSet<Toppings> Toppings { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetail { get; set; }
    }
}
