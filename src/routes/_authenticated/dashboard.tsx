import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
import { useAuth } from "@/hooks/use-auth";
import { ROLE_LABELS } from "@/lib/nav-config";
import { Users, Clock, CalendarDays, Wallet, Building2, Target } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

const STAT_CARDS = [
  { label: "Employees", value: "—", icon: Users, hint: "Total active" },
  { label: "Departments", value: "—", icon: Building2, hint: "Organizational units" },
  { label: "Present today", value: "—", icon: Clock, hint: "Clocked in" },
  { label: "On leave", value: "—", icon: CalendarDays, hint: "Approved leaves" },
  { label: "Payroll period", value: "—", icon: Wallet, hint: "Current cycle" },
  { label: "Open reviews", value: "—", icon: Target, hint: "Pending evaluations" },
];

function Dashboard() {
  const { user, roles } = useAuth();

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${user?.email?.split("@")[0] ?? "there"}`}
        description="Overview of your HR operations."
        actions={
          <div className="flex flex-wrap gap-1">
            {roles.length === 0 ? (
              <Badge variant="secondary">No role assigned</Badge>
            ) : (
              roles.map((r) => <Badge key={r}>{ROLE_LABELS[r]}</Badge>)
            )}
          </div>
        }
      />

      {roles.length === 0 && (
        <Card className="border-amber-500/40 bg-amber-50/50 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle className="text-base text-amber-900 dark:text-amber-200">Account pending role assignment</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-amber-900/80 dark:text-amber-200/80">
            Ask an Owner or HR Staff to assign you a role in the <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/40">user_roles</code> table.
            First user? Run this in Supabase SQL editor:
            <pre className="mt-2 overflow-x-auto rounded bg-background/50 p-2 text-xs">
{`INSERT INTO public.user_roles (user_id, role)
VALUES ('${user?.id ?? "<your-id>"}', 'owner');`}
            </pre>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {STAT_CARDS.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{s.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
