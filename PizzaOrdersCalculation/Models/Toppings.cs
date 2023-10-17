using System.ComponentModel.DataAnnotations;

namespace PizzaOrdersCalculation.Models
{
    public class Toppings
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
