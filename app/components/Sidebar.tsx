import { CalendarDays } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-72 bg-slate-950 p-8">
      <nav className="space-y-6">
        <a
          href=""
          className="flex items-center gap-2 text-xl font-semibold text-zinc-200"
        >
          Câmara LP3
        </a>
        <a
          href=""
          className="flex items-center gap-2 text-base font-semibold text-zinc-200"
        >
          <CalendarDays />
          Eventos
        </a>
      </nav>
    </aside>
  );
}
