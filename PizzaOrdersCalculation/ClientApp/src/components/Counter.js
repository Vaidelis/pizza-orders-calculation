import React, { useEffect } from "react";
import PizzaService from "D:\Projects\PizzaOrdersCalculation\PizzaOrdersCalculation/Services/PizzaService";

const Counter = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchDate = async () => {
      const date = await PizzaService.GetAllOrders();
      setDate(date);
    };

    fetchDate();
  }, []);

  return (
    <div>
      <h1>Date from .NET in-memory database</h1>
      <p>{date}</p>
    </div>
  );
};

export default Counter;