import * as React from "react";
import {
  IconDashboard,
  IconWallet,
  IconSettings,
  IconChartBar,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { useNav } from "@/context/nav-context";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Expense Tracker",
    email: "track@expenses.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Expenses",
      url: "#",
      icon: IconWallet,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onCreateExpense?: () => void;
}

export function AppSidebar({ onCreateExpense, ...props }: AppSidebarProps) {
  const { setCurrentPage } = useNav();

  const handleNavClick = (title: string) => {
    const pageMap: Record<string, "dashboard" | "expenses" | "analytics"> = {
      Dashboard: "dashboard",
      Expenses: "expenses",
      Analytics: "analytics",
    };
    const page = pageMap[title];
    if (page) {
      setCurrentPage(page);
    }
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconWallet className="!size-5" />
                <span className="text-base font-semibold">Expense Tracker</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain}
          onItemClick={handleNavClick}
          onCreateExpense={onCreateExpense}
        />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
