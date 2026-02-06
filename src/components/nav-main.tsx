import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";

import { useNav } from "@/context/nav-context";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
  onItemClick,
  onCreateExpense,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
  onItemClick?: (title: string) => void;
  onCreateExpense?: () => void;
}) {
  const { currentPage } = useNav();

  // Map nav item titles to page names
  const pageMap: Record<string, string> = {
    Dashboard: "dashboard",
    Expenses: "expenses",
    Analytics: "analytics",
  };

  const getActiveClass = (itemTitle: string) => {
    const pageName = pageMap[itemTitle];
    const isActive = pageName === currentPage;
    return isActive
      ? "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-600"
      : "";
  };
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground duration-200 ease-linear h-10"
              onClick={onCreateExpense}
            >
              <IconCirclePlusFilled className="h-5 w-5" />
              <span className="text-sm font-semibold">Create</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                onClick={() => onItemClick?.(item.title)}
                className={`h-10 transition-colors duration-200 ${getActiveClass(item.title)}`}
              >
                {item.icon && <item.icon className="h-5 w-5" />}
                <span className="text-sm font-medium">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
