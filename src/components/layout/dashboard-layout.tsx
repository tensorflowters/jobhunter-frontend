import React from "react";
import { Link } from "@tanstack/react-router";
import { Icon } from "@iconify/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Spacer,
  Button,
  Tooltip,
  Badge,
} from "@heroui/react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const [activeItem, setActiveItem] = React.useState("home");

  const menuItems = [
    {
      key: "home",
      label: "Dashboard",
      icon: "lucide:layout-dashboard",
      path: "/",
    },
    {
      key: "saved",
      label: "Saved Offers",
      icon: "lucide:bookmark",
      path: "/saved-offers",
      badge: 12,
    },
    {
      key: "sources",
      label: "Sources",
      icon: "lucide:briefcase",
      path: "/sources",
    },
  ];

  const handleMenuClick = (key: string) => {
    setActiveItem(key);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="hidden sm:flex w-64 flex-col bg-content1 border-r border-divider">
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center gap-2">
            <Icon
              icon="lucide:briefcase-search"
              className="text-primary text-2xl"
            />
            <span className="font-semibold text-lg">JobTrack</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 p-2">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className={`
                flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors
                ${
                  activeItem === item.key
                    ? "bg-primary/10 text-primary"
                    : "text-foreground-500 hover:bg-content2 hover:text-foreground"
                }
              `}
              onClick={() => handleMenuClick(item.key)}
            >
              <Icon icon={item.icon} className="text-lg" />
              <span>{item.label}</span>
              {item.badge && (
                <Badge
                  content={item.badge}
                  color="primary"
                  size="sm"
                  className="ml-auto"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </div>

        <Spacer y={4} />

        <div className="mt-auto p-4">
          <Button
            size="sm"
            color="primary"
            variant="flat"
            startContent={<Icon icon="lucide:plus" />}
            className="w-full"
          >
            Add Job Source
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navbar */}
        <Navbar
          maxWidth="full"
          className="border-b border-divider bg-content1"
          height="3.5rem"
        >
          <NavbarContent className="sm:hidden">
            <NavbarBrand>
              <Icon
                icon="lucide:briefcase-search"
                className="text-primary text-xl"
              />
              <span className="font-semibold ml-2">JobTrack</span>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent justify="end">
            <div className="flex items-center gap-2">
              <Tooltip content="Settings">
                <Button isIconOnly variant="light" radius="full">
                  <Icon icon="lucide:settings" className="text-lg" />
                </Button>
              </Tooltip>

              <Tooltip content="Notifications">
                <Button isIconOnly variant="light" radius="full">
                  <Badge content="3" color="danger" shape="circle" size="sm">
                    <Icon icon="lucide:bell" className="text-lg" />
                  </Badge>
                </Button>
              </Tooltip>
            </div>
          </NavbarContent>
        </Navbar>

        {/* Page content */}
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </div>
    </div>
  );
};
