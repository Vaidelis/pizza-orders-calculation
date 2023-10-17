import { PizzaList } from "./components/PizzaList";
import { PizzaOrder } from "./components/PizzaOrder";
import { OrderList } from "./components/OrderList";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/pizza-list',
    element: <PizzaList />
  },
  {
    path: '/pizza-order',
    element: <PizzaOrder />
  },
  {
    path: '/order-list',
    element: <OrderList />
  },
];

export default AppRoutes;
