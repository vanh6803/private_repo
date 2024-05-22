import React, { useEffect, useState } from "react";
import { Layout, notification, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
const { Content } = Layout;
import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import {
  HomeIcon,
  Squares2X2Icon,
  DocumentChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const role = Cookies.get("role");

  const itemMenu = [
    getItem(
      <Link to={"/"}>Trang chủ</Link>,
      "/",
      <HomeIcon className="w-5 h-5" />
    ),
    getItem("Sản phẩm", "product", <Squares2X2Icon className="w-5 h-5" />, [
      getItem(<Link to={"/products"}>Sản phẩm</Link>, "/products"),
      getItem(<Link to={"/categories"}>Loại sản phẩm</Link>, "/categories"),
      getItem(<Link to="/banner">Quảng cáo</Link>, "/banner"),
    ]),
    getItem("Thống kê", "chart", <DocumentChartBarIcon className="w-5 h-5" />, [
      getItem(<Link to="/chart/product">Sản phẩm</Link>, "/chart/product"),
      getItem(<Link to="/chart/store">Cửa hàng</Link>, "/chart/store"),
    ]),
    getItem("Mọi người", "user", <UserGroupIcon className="w-5 h-5" />, [
      getItem(<Link to={"/stores"}>Cửa hàng</Link>, "/stores"),
      getItem(<Link to="/customers">Người dùng</Link>, "/customers"),
      role == "admin"
        ? getItem(<Link to="/staffs">Nhân viên</Link>, "/staffs")
        : null,
    ]),
  ];
  return (
    <div className="bg-black">Home</div>
  )
}
