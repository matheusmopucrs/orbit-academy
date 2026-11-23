import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { to: "/courses", label: "Courses" },
  { to: "/videos", label: "Videos" },
  { to: "/tests", label: "Tests" },
  { to: "/extra", label: "Extra" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-4 z-50 mx-auto w-[min(1100px,92%)]">
      <nav className="glass flex items-center justify-between rounded-full px-5 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <Sparkles className="h-5 w-5 text-primary" /> Nexus<span className="text-primary">Study</span>
        </Link>
        <ul className="hidden gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground" activeProps={{ className: "bg-muted text-foreground" }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      {open && (
        <ul className="glass mt-2 flex flex-col rounded-2xl p-2 md:hidden">
          {links.map((l) => (
            <li key={l.to}><Link to={l.to} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 hover:bg-muted">{l.label}</Link></li>
          ))}
        </ul>
      )}
    </header>
  );
}
