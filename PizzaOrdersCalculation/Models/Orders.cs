using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PizzaOrdersCalculation.Models
{
    public class Orders
    {
        [Key]
        public int Id { get; set; }
        public DateTimeOffset OrderDate { get; set; }

    }
}
