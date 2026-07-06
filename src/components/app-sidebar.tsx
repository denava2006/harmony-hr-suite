import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
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
import { NAV_ITEMS, ROLE_LABELS, primaryRole } from "@/lib/nav-config";
import { useAuth } from "@/hooks/use-auth";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/harmony-suite-logo.png.asset.json";

// Left-hand navigation. Modules are filtered by the roles the signed-in user
// holds, and the footer shows the user's highest-priority role (Owner beats
// Employee, etc.) so a promoted account no longer displays "Employee".
export function AppSidebar() {
  const { roles, user, signOut } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = NAV_ITEMS.filter((item) => item.roles.some((r) => roles.includes(r)));
  const displayRole = primaryRole(roles);

  const handleSignOut = async () => {
    await signOut();
    await navigate({ to: "/auth", replace: true });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 flex-row items-center gap-2 border-b border-sidebar-border px-2 py-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-sidebar-border">
          <img src={logoAsset.url} alt="Harmony Suite" className="h-9 w-9 object-contain" />
        </div>
        <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
          <span className="text-sm font-semibold tracking-tight">Harmony Suite</span>
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">HRMS System</span>
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
              {displayRole ? ROLE_LABELS[displayRole] : "No role"}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => void handleSignOut()} className="justify-start">
            <LogOut className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]:hidden">Sign out</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
