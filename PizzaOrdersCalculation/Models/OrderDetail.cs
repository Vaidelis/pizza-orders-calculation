using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using PizzaOrdersCalculation.Model;

namespace PizzaOrdersCalculation.Models
{
    public class OrderDetail
    {
        [Key]
        public int Id { get; set; }

        public int OrderId { get; set; }

        [ForeignKey("OrderId")]
        public virtual Orders Order { get; set; }

        public int ToppingsId { get; set; }

        [ForeignKey("ToppingsId")]
        public virtual Toppings Topping { get; set; }

    }
}
