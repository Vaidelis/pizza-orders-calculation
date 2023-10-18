import { OrderList } from "./components/OrderList";
import { Home } from "./components/Home";
import { ListPizza } from "./components/ListPizza";
import { CreateOrder } from "./components/CreateOrder";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/order-list',
    element: <OrderList />
  },
  {
    path: '/list-pizza',
    element: <ListPizza />
  },
  {
    path: '/create-order',
    element: <CreateOrder />
  },
];

export default AppRoutes;
