import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NAV_ITEMS, ROLE_LABELS } from "@/lib/nav-config";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const { roles, user, signOut } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = NAV_ITEMS.filter((item) => item.roles.some((r) => roles.includes(r)));
  const primaryRole = roles[0];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 flex-row items-center gap-2 border-b border-sidebar-border px-2 py-0">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Building className="h-4 w-4" />
        </div>
        <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
          <span className="text-sm font-semibold">HRMS</span>
          <span className="text-xs text-muted-foreground">Human Resources</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.to || pathname.startsWith(item.to + "/");
                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                      <Link to={item.to}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-medium">{user?.email}</span>
            <span className="text-xs text-muted-foreground">
              {primaryRole ? ROLE_LABELS[primaryRole] : "No role"}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => void signOut()} className="justify-start">
            <LogOut className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]:hidden">Sign out</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
