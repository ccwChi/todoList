import { Sidebar } from "flowbite-react";

import {
  // HiArrowSmRight,
  HiChartPie,
  // HiInbox,
  // HiShoppingBag,
  // HiTable,
  // HiUser,
} from "react-icons/hi";
import PersonelCard from "./PersonelCard";
import { useLocation } from "react-router-dom";
import sidebarRoutes from "../data/sidebarRoutes";
import {memo} from "react";

const FlowbiteSidebar = memo(function FlowbiteSidebar() {
  const location = useLocation();
  // console.log("sidebar");

  return (
    <Sidebar className="w-[200px]">
      <PersonelCard />
      <Sidebar.Items className="">
        <Sidebar.ItemGroup>
          {sidebarRoutes.map((route) => (
            <Sidebar.Item
              href={route.href}
              key={route.label}
              icon={route.icon}
              className={`ps-4 ${
                location.pathname === route.href ? "bg-green-400 " : ""
              }`}
            >
              {route.label}
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
});
// FlowbiteSidebar.displayName = "FlowbiteSidebar";
export default FlowbiteSidebar;
