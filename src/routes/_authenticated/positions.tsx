import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/page-header";
export const Route = createFileRoute("/_authenticated/positions")({ component: () => <ModulePlaceholder title="Positions" description="Job titles, levels, and salary grades." phase="Phase 2" /> });
