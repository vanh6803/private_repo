import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Home from "../pages/Home";
import App from "../App";
import Customers from "../pages/Users/Customers";
import Staffs from "../pages/Users/Staffs";
import Products from "./../pages/Products/Products";
import Store from "./../pages/Users/Store";
import Banner from "./../pages/Products/Banner";
import ProductDetail from "../pages/Products/ProductDetail";
import Category from "../pages/Products/Category";
import Invoice from "../pages/invoice/Invoice";
import CreateNewProduct from "../pages/Products/CreateNewProduct";
import EditProduct from "../pages/Products/editProduct";
import StatisticsProduct from "../pages/Statistics/StatisticsProduct";
import StatisticsRevenue from "../pages/Statistics/StatisticsRevenue";
import StatisticsCustomer from "../pages/Statistics/StatisticsCustomer";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/customers", element: <Customers /> },
      { path: "/staffs", element: <Staffs /> },
      { path: "/products", element: <Products />, children: [] },
      { path: "/categories", element: <Category /> },
      { path: "/stores", element: <Store /> },
      { path: "/banner", element: <Banner /> },
      { path: "/statistics/product", element: <StatisticsProduct /> },
      { path: "/statistics/revenue", element: <StatisticsRevenue /> },
      { path: "/statistics/customer", element: <StatisticsCustomer /> },
      { path: "/invoice", element: <Invoice /> },
    ],
  },
  { path: "/products/:id", element: <ProductDetail /> },
  { path: "/products/create", element: <CreateNewProduct /> },
  { path: "/products/edit-product/:id", element: <EditProduct /> },
]);
