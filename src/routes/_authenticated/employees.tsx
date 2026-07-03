import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/page-header";
export const Route = createFileRoute("/_authenticated/employees")({ component: () => <ModulePlaceholder title="Employees" description="Manage personal, employment, and role information." phase="Phase 2" /> });
