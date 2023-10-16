using PizzaOrdersCalculation.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PizzaOrdersCalculation.Model
{
    public class Pizza
    {
        [Key]
        public int Id { get; set; }
        public string Size { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }

        public int OrderId { get; set; }

        [ForeignKey("OrderId")]
        public virtual Orders Order { get; set; }
    }
}
