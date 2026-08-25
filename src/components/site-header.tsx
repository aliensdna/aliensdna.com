import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { StrandMark } from "@/components/strand-mark";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#record", label: "The record" },
  { href: "#specimens", label: "Specimens" },
  { href: "#list", label: "Join the list" },
] as const;

function Wordmark() {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="text-xs font-medium uppercase tracking-mark text-muted">
        Aliens
      </span>
      <span className="font-display text-xl italic leading-none text-fg">
        DNA
      </span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="flex items-center gap-3 text-fg"
          onClick={() => setOpen(false)}
        >
          <StrandMark size="nav" />
          <Wordmark />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors duration-[var(--motion-quick)] ease-[var(--ease-smooth-out)] hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className={cn(
          "border-t border-border bg-bg md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col px-6 py-4" aria-label="Mobile">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center text-base text-fg"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
