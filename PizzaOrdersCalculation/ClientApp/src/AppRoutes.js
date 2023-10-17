import { PizzaList } from "./components/PizzaList";
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
];

export default AppRoutes;
