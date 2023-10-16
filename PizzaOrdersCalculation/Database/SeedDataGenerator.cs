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

                        context.Pizzas.AddRange(pizzas);
                        context.Orders.AddRange(orders);
                        context.OrderDetail.AddRange(orderDetails);

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
                        Name = "Md. Mahedee Hasan",
                        Size = "Head of Software Development",
                        Price = 12,
                    },

                    new Pizza
                    {
                        Name = "Khaleda Islam",
                        Size = "Software Engineer",
                        Price = 10,
                    },

                    new Pizza
                    {
                        Name = "Tahiya Hasan Arisha",
                        Size = "Jr. Software Engineer",
                        Price = 8,
                    }
              };
        }

        public static Orders[] GenerateOrders()
        {
            return new Orders[] {
                  new Orders
                  {
                      OrderDate = DateTimeOffset.UtcNow,
                  },
                  new Orders
                  {
                      OrderDate = DateTimeOffset.UtcNow,
                  },
                  new Orders
                  {
                      OrderDate = DateTimeOffset.UtcNow,
                  },
                  new Orders
                  {
                      OrderDate = DateTimeOffset.UtcNow,
                  },
            };
        }

        public static OrderDetail[] GenerateOrderDetails()
        {
            return new OrderDetail[] {
                  new OrderDetail
                  {
                      OrderId = 1,
                      PizzaId = 1,
                      PizzaPrice = 12,
                  },
                  new OrderDetail
                  {
                      OrderId = 4,
                      PizzaId = 1,
                      PizzaPrice = 12,
                  },
                  new OrderDetail
                  {
                      OrderId = 5,
                      PizzaId = 1,
                      PizzaPrice = 12,
                  },
                  new OrderDetail
                  {
                      OrderId = 6,
                      PizzaId = 1,
                      PizzaPrice = 12,
                  },
                  new OrderDetail
                  {
                       OrderId = 1,
                      PizzaId = 1,
                      PizzaPrice = 12,
                  },
                  new OrderDetail
                  {
                       OrderId = 1,
                      PizzaId = 1,
                      PizzaPrice = 12,
                  },
                  new OrderDetail
                  {
                      OrderId = 1,
                      PizzaId = 1,
                      PizzaPrice = 12,
                  },
              };
        }
        #endregion
    }
}
