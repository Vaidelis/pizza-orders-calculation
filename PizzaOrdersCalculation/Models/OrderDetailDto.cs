namespace PizzaOrdersCalculation.Models
{
    public class OrderDetailDto
    {
        public decimal OrderItemPrice { get; set; }
        public string OrderPizzaName { get; set; }
        public string OrderSize { get; set; }
    }
}
