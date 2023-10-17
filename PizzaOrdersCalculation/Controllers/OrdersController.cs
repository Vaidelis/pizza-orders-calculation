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
        [HttpPost]
        public async Task<IActionResult> CreateOrderl([FromBody] Orders order)
        {
            try
            {
                 _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                return Ok("Order detail created successfully");
            }
            catch (Exception ex)
            {
                // Handle any errors or exceptions that may occur during order detail creation
                // Return an appropriate error response (e.g., status code 500) in case of an error
                return StatusCode(500, "Error creating order detail");
            }
        }
    }
}