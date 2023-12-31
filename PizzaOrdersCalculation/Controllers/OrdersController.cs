﻿using Microsoft.AspNetCore.Mvc;
using PizzaOrdersCalculation.Model;
using PizzaOrdersCalculation.Models;

namespace PizzaOrdersCalculation.Controllers
{
    [Route("[controller]")]
    public class OrdersController : Controller
    {
        private readonly PizzaDbContext _context;

        public OrdersController(PizzaDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public List<Orders> GetOrders()
        {
            return _context.Orders.ToList();
        }
        [HttpPost]
        public async Task<IActionResult> CreateOrderl([FromBody] Orders order)
        {
            try
            {
                 _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                int orderId = order.Id;

                return Ok(new { orderId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error creating order detail");
            }
        }
        
    }
}
