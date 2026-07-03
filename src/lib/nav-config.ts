import type { AppRole } from "@/integrations/supabase/types";
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  Clock,
  CalendarDays,
  Wallet,
  UserPlus,
  Target,
  BarChart3,
  Link2,
} from "lucide-react";
import type { ComponentType } from "react";

export interface NavItem {
  title: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
  roles: AppRole[]; // any of these roles can see it
}

export const NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", to: "/dashboard", icon: LayoutDashboard, roles: ["owner", "hr_staff", "manager", "employee", "cashier"] },
  { title: "Employees", to: "/employees", icon: Users, roles: ["owner", "hr_staff", "manager"] },
  { title: "Departments", to: "/departments", icon: Building2, roles: ["owner", "hr_staff"] },
  { title: "Positions", to: "/positions", icon: Briefcase, roles: ["owner", "hr_staff"] },
  { title: "Attendance", to: "/attendance", icon: Clock, roles: ["owner", "hr_staff", "manager", "employee"] },
  { title: "Leave", to: "/leave", icon: CalendarDays, roles: ["owner", "hr_staff", "manager", "employee"] },
  { title: "Payroll", to: "/payroll", icon: Wallet, roles: ["owner", "hr_staff", "employee"] },
  { title: "Recruitment", to: "/recruitment", icon: UserPlus, roles: ["owner", "hr_staff"] },
  { title: "Performance", to: "/performance", icon: Target, roles: ["owner", "hr_staff", "manager", "employee"] },
  { title: "Reports", to: "/reports", icon: BarChart3, roles: ["owner", "hr_staff", "manager"] },
  { title: "SariSync", to: "/integrations", icon: Link2, roles: ["owner", "hr_staff"] },
];

export const ROLE_LABELS: Record<AppRole, string> = {
  owner: "Owner",
  hr_staff: "HR Staff",
  manager: "Manager",
  employee: "Employee",
  cashier: "Cashier",
};
