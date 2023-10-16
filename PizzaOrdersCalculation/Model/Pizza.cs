using System.ComponentModel.DataAnnotations.Schema;

namespace PizzaOrdersCalculation.Model
{
    public class Pizza
    {
        public int Id { get; set; }
        public string Size { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
    }
}
