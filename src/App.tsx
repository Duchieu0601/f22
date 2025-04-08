import { useRoutes } from "react-router";
import ProductList from "./pages/product/list";
import ProductAdd from "./pages/product/add";
import ProductEdit from "./pages/product/edit";
import "antd/dist/reset.css";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import ListOrder from "./pages/order/list";
import RevenueReport from "./pages/statistics/revenuereport";

import AdminLayout from "./pages/layout/Admin";
import ClientLayout from "./pages/layout/Client";
import UserList from "./user/list";

function App() {
  const element = useRoutes([
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "products", element: <ProductList /> },
        { path: "product/add", element: <ProductAdd /> },
        { path: "product/:id/edit", element: <ProductEdit /> },
        { path: "users", element: <UserList /> },
        { path: "order", element: <ListOrder /> },
        { path: "revenuereport", element: <RevenueReport /> },
      ],
    },
    {
      path: "/client",
      element: <ClientLayout />,
      children: [
        { path: "", element: <div>Trang chính client</div> }, // Thêm route mặc định cho client
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);

  return <main>{element}</main>;
}

export default App;
