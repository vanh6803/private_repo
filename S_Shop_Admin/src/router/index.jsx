import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Product from "../pages/product/Product";
import Category from "../pages/category/Category";
import App from "../App";
import Banner from "../pages/banner/Banner";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/product", element: <Product /> },
      { path: "/category", element: <Category /> },
      { path: "/banner", element: <Banner /> },
    ],
  },
  // { path: "/products/:id", element: <ProductDetail /> },
]);
