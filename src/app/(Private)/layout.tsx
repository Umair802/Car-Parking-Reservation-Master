"use client";

import { JSX, ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import {
  HiUserCircle,
  HiOutlineViewGrid,
  HiOutlineUsers,
  HiOutlineCreditCard,
  HiOutlineMap,
  HiChevronLeft,
  HiChevronRight,
  HiLogout,
} from "react-icons/hi";
import useAuth from "@/hooks/useAuth";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Role } from "@/types/roles";

type SidebarItem = {
  label: string;
  href: string;
  roles: Role[];
  icon: JSX.Element;
};

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    roles: [Role.ADMIN, Role.USER],
    icon: <HiOutlineViewGrid />,
  },
  {
    label: "Users",
    href: "/users",
    roles: [Role.ADMIN],
    icon: <HiOutlineUsers />,
  },
  {
    label: "Parkings",
    href: "/parkings",
    roles: [Role.ADMIN, Role.USER],
    icon: <HiOutlineMap />,
  },
  {
    label: "Payments",
    href: "/payments",
    roles: [Role.ADMIN, Role.USER],
    icon: <HiOutlineCreditCard />,
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, loaded, logOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const user: any = useLocalStorage("user");
  const [collapsed, setCollapsed] = useState(false);

  if (!loaded) return <div className="p-6">Loading...</div>;
  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }
console.log(user,"user")
  const visibleItems = sidebarItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={clsx(
          "flex flex-col bg-orange-100 border-orange-200 border-r text-black/80 transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Sidebar Header */}
        <div
          className={`flex ${
            !collapsed ? "justify-between" : "justify-end"
          } items-center p-4 border-orange-200 border-b`}
        >
          {!collapsed && (
            <span className="font-bold text-orange-600 text-xl">
              Park Buddy
            </span>
          )}
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="text-orange-600 text-xl"
          >
            {collapsed ? <HiChevronRight /> : <HiChevronLeft />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 space-y-2 px-2 py-4">
          {visibleItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 hover:bg-orange-200 px-3 py-2 rounded-md transition-all",
                pathname === item.href && "bg-orange-300 font-semibold",
                collapsed && "justify-center"
              )}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-2 py-4">
          <button
            onClick={logOut}
            className={clsx(
              "flex items-center gap-3 hover:bg-orange-200 px-3 py-2 rounded-md w-full text-left transition",
              collapsed && "justify-center"
            )}
          >
            <span className="text-xl">
              <HiLogout />
            </span>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="top-0 z-10 sticky flex justify-end items-center bg-white shadow px-6 py-4">
          <div className="flex items-center gap-2 text-black/70">
            <HiUserCircle className="text-4xl" />
            <div className="text-sm">
              <p className="font-medium">{user?.email || "User"}</p>
              <p className="text-xs capitalize">{user?.role?.toLowerCase()}</p>
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <div className="p-6 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
