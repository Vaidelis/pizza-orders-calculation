using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using PizzaOrdersCalculation.Model;
using PizzaOrdersCalculation.Models;

namespace PizzaOrdersCalculation.Database
{
    public static class SeedDataGenerator
    {
        static object synchlock = new object();
        static volatile bool seeded = false;

        public static void EnsureSeedData(this PizzaDbContext context)
        {
            if (!seeded && context.Pizzas.Count() == 0)
            {
                lock (synchlock)
                {
                    if (!seeded)
                    {
                        var pizzas = GenerateCustomers();
                        var orders = GenerateOrders();
                        var orderDetails = GenerateOrderDetails();
                        var toppings = GenerateToppings();

                        context.Pizzas.AddRange(pizzas);
                        context.Orders.AddRange(orders);
                        context.OrderDetail.AddRange(orderDetails);
                        context.Toppings.AddRange(toppings);

                        context.SaveChanges();
                        seeded = true;
                    }
                }
            }
        }

        #region Data
        public static Pizza[] GenerateCustomers()
        {
            return new Pizza[] {
                  new Pizza
                    {
                        Name = "Italian pizza",
                        Size = "Large",
                        Price = 12,
                    },

                    new Pizza
                    {
                        Name = "Italian pizza",
                        Size = "Medium",
                        Price = 10,
                    },

                    new Pizza
                    {
                        Name = "Italian pizza",
                        Size = "Small",
                        Price = 8,
                    }
              };
        }

        public static Orders[] GenerateOrders()
        {
            return new Orders[] {
                  new Orders
                  {
                      OrderDate = DateTime.UtcNow,
                      PizzaId = 1,
                      PizzaPrice = 12,
                  },
                  new Orders
                  {
                      OrderDate = DateTime.UtcNow,
                      PizzaId = 2,
                      PizzaPrice = 10,
                  },
                  new Orders
                  {
                      OrderDate = DateTime.UtcNow,
                      PizzaId = 3,
                      PizzaPrice = 8,
                  },
            };
        }

        public static OrderDetail[] GenerateOrderDetails()
        {
            return new OrderDetail[] {
                  new OrderDetail
                  {
                      OrderId = 1,
                      ToppingsId = 1,
                  },
                  new OrderDetail
                  {
                      OrderId = 1,
                      ToppingsId = 2,
                  },
                  new OrderDetail
                  {
                      OrderId = 1,
                      ToppingsId = 3,
                  },
              };
        }

        public static Toppings[] GenerateToppings()
        {
            return new Toppings[] {
                  new Toppings
                  {
                      Name = "Cheese",
                  },
                  new Toppings
                  {
                      Name = "Ham",
                  },
                  new Toppings
                  {
                      Name = "Onion",
                  },
              };
        }
        #endregion
    }
}
