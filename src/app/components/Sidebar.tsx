import { CalendarDays } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-72 bg-slate-950 p-8">
      <nav className="space-y-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-3xl font-semibold text-zinc-200"
        >
          Câmara LP3
        </Link>
      </nav>
    </aside>
  );
}
