namespace PizzaOrdersCalculation.Models
{
    public class OrderDiscountCalculationRequest
    {
        public decimal PizzaPrice { get; set; }
        public decimal ToppingsPrice { get; set; }
        public decimal OrderDiscount { get; set; }
    }
}
