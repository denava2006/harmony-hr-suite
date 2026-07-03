import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/page-header";
export const Route = createFileRoute("/_authenticated/departments")({ component: () => <ModulePlaceholder title="Departments" description="Organizational units and structure." phase="Phase 2" /> });
