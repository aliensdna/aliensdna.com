import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { StrandMark } from "@/components/strand-mark";
import { LoopFilm } from "@/components/loop-film";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LIST_KEY = "aliens-dna-signal";

const TICKER =
  "ATGC · ALIENS DNA · SEQUENCE 00 · PUBLIC RECORD · ORIGIN UNKNOWN · ";

const RECORD = [
  {
    n: "01",
    title: "Origin",
    body: "Every brand starts as a frequency. This one started as a name — Aliens DNA — and a domain waiting to be spoken into.",
  },
  {
    n: "02",
    title: "Archive",
    body: "Still frames, field notes, and fragments collected before the first drop. The record grows in public.",
  },
  {
    n: "03",
    title: "List",
    body: "The people who arrive early hear it first. No feed. No noise. One letter when something ships.",
  },
] as const;

const SPECIMENS = [
  {
    src: "/images/archive-column.jpg",
    file: "Vitrine 01",
    title: "Helix, unidentified",
    alt: "A towering column of helical light on a dark soundstage",
  },
  {
    src: "/images/archive-rungs.jpg",
    file: "Slide 12",
    title: "Printed strand",
    alt: "Macro of a translucent DNA ladder catching silver light",
  },
  {
    src: "/images/archive-glass.jpg",
    file: "Film 07",
    title: "Membrane, untyped",
    alt: "Iridescent glass with helix shadows across its surface",
  },
] as const;

type ListEntry = { email: string; specimen: string };

export const Route = createFileRoute("/")({ component: Home });

function assignSpecimen() {
  const part = () => String(1000 + Math.floor(Math.random() * 9000));
  return `ADN-${part()}-${part()}`;
}

function readEntry(): ListEntry | null {
  try {
    const raw = localStorage.getItem(LIST_KEY);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (
        parsed &&
        typeof parsed === "object" &&
        "specimen" in parsed &&
        "email" in parsed
      ) {
        return parsed as ListEntry;
      }
    } catch {
      /* stored as a bare email in an earlier build */
    }
    const specimen = assignSpecimen();
    const entry = { email: raw, specimen };
    localStorage.setItem(LIST_KEY, JSON.stringify(entry));
    return entry;
  } catch {
    return null;
  }
}

function Home() {
  const [entry, setEntry] = useState<ListEntry | null>(null);

  useEffect(() => {
    setEntry(readEntry());
  }, []);

  function join(email: string) {
    const next = { email, specimen: assignSpecimen() };
    try {
      localStorage.setItem(LIST_KEY, JSON.stringify(next));
    } catch {
      /* preview still shows success */
    }
    setEntry(next);
  }

  return (
    <div id="top" className="min-h-svh bg-bg text-fg">
      <a
        href="#record"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main>
        <Hero entry={entry} onJoin={join} />
        <Ticker />
        <Record />
        <NightField />
        <Witness />
        <Specimens />
        <Signal entry={entry} onJoin={join} />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero({
  entry,
  onJoin,
}: {
  entry: ListEntry | null;
  onJoin: (email: string) => void;
}) {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-6 py-16">
      <p className="rise text-xs font-medium uppercase tracking-mark text-muted">
        File 00 · Public record
      </p>

      <h1 className="rise rise-d1 mt-8 flex flex-col items-center gap-4 text-center md:flex-row md:gap-6">
        <span className="font-display text-6xl italic leading-none tracking-display text-fg sm:text-8xl">
          Aliens
        </span>
        <StrandMark size="hero" label="Aliens DNA strand" />
        <span className="font-display text-6xl italic leading-none tracking-display text-fg sm:text-8xl">
          DNA
        </span>
      </h1>

      <p className="rise rise-d2 mt-8 max-w-lg text-center text-base leading-normal text-muted">
        The sequence was never fully human.
      </p>
      <p className="rise rise-d3 mt-3 max-w-lg text-center text-sm leading-normal text-subtle">
        A name claimed. A mark set down. Leave a signal — first to hear when the
        archive opens.
      </p>

      <div className="rise rise-d4 mt-10 flex w-full max-w-lg flex-col items-center gap-4">
        <SignalForm entry={entry} onJoin={onJoin} compact />
        <a
          href="#record"
          className="text-xs font-medium uppercase tracking-mark text-muted transition-colors duration-[var(--motion-quick)] hover:text-fg"
        >
          Read the record
        </a>
      </div>
    </section>
  );
}

function Ticker() {
  const phrase = TICKER.repeat(4);
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track py-3">
        <span className="ticker-item text-xs font-medium uppercase tracking-mark text-muted">
          {phrase}
        </span>
        <span className="ticker-item text-xs font-medium uppercase tracking-mark text-muted">
          {phrase}
        </span>
      </div>
    </div>
  );
}

function Record() {
  return (
    <section id="record" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-mark text-muted">
          01 · The record
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl italic leading-snug tracking-display text-fg sm:text-5xl">
          This is the public face of a private archive.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-normal text-muted">
          Aliens DNA is a project taking shape in the open. Drops, notes, and
          whatever comes next land here first. You do not need a theory. You
          need a name on the list.
        </p>
        <ul className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {RECORD.map((item) => (
            <li key={item.n} className="border-t border-border pt-6">
              <p className="text-xs tabular-nums text-subtle">{item.n}</p>
              <h3 className="mt-4 font-display text-3xl italic tracking-display text-fg">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-normal text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function NightField() {
  return (
    <section className="px-6 pb-8">
      <figure className="relative mx-auto max-w-6xl overflow-hidden rounded-xl bg-surface">
        <img
          src="/images/archive-void.jpg"
          alt="A faint helical constellation in a black void"
          className="archive-frame aspect-video size-full rounded-xl object-cover"
        />
        <figcaption className="absolute bottom-4 left-4 text-xs font-medium uppercase tracking-mark text-fg">
          Site 04 · Night record
        </figcaption>
      </figure>
    </section>
  );
}

function Witness() {
  return (
    <section id="subject" className="px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="order-2 md:order-1 md:col-span-5">
          <p className="text-xs font-medium uppercase tracking-mark text-muted">
            Subject 01
          </p>
          <h2 className="mt-4 font-display text-4xl italic leading-snug tracking-display text-fg sm:text-5xl">
            It blinks. The file does not.
          </h2>
          <p className="mt-6 max-w-md text-base leading-normal text-muted">
            A living frame from the archive. Not a mascot — a pupil looking
            back. Leave it running. The lid is part of the record.
          </p>
          <p className="mt-8 text-xs font-medium uppercase tracking-mark text-subtle">
            Film 03 · Iris, untyped
          </p>
        </div>
        <figure className="order-1 md:order-2 md:col-span-7 md:flex md:justify-end">
          <div className="film-iris overflow-hidden">
            <LoopFilm
              src="/films/iris.mp4"
              poster="/films/iris-poster.jpg"
              label="Untyped iris — a close study of a blinking reptilian eye"
              className="archive-frame rounded-lg"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}

function Specimens() {
  return (
    <section id="specimens" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-mark text-muted">
          02 · Specimens
        </p>
        <h2 className="mt-4 font-display text-4xl italic tracking-display text-fg sm:text-5xl">
          Evidence, not explanation.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-normal text-muted">
          Three frames from the file. The helix, the slide, the membrane. None
          of them ask you to believe. They ask you to look.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-3">
          {SPECIMENS.map((item) => (
            <li key={item.file}>
              <figure className="overflow-hidden rounded-xl bg-surface">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="archive-frame aspect-[4/3] size-full rounded-xl object-cover"
                />
              </figure>
              <p className="mt-4 text-xs font-medium uppercase tracking-mark text-subtle">
                {item.file}
              </p>
              <p className="mt-1 text-sm text-fg">{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Signal({
  entry,
  onJoin,
}: {
  entry: ListEntry | null;
  onJoin: (email: string) => void;
}) {
  return (
    <section id="list" className="border-t border-border px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12">
        <p className="text-xs font-medium uppercase tracking-mark text-muted md:col-span-4">
          03 · The signal
        </p>
        <div className="md:col-span-8">
          <h2 className="font-display text-4xl italic tracking-display text-fg sm:text-5xl">
            When the next drop lands, the list hears it first.
          </h2>
          <p className="mt-6 max-w-md text-base leading-normal text-muted">
            No spam. No feed. One note when something new is ready — a drop, a
            page, a record. You get a specimen number. We keep the file.
          </p>
          <p className="mt-8 text-xs font-medium uppercase tracking-mark text-subtle">
            Join the sequence
          </p>
          <p className="mt-2 text-sm text-muted">Leave a signal.</p>
          <SignalForm entry={entry} onJoin={onJoin} />
        </div>
      </div>
    </section>
  );
}

function SignalForm({
  entry,
  onJoin,
  compact = false,
}: {
  entry: ListEntry | null;
  onJoin: (email: string) => void;
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Enter a real address.");
      return;
    }
    setError("");
    onJoin(value);
  }

  if (entry) {
    return (
      <p
        className={cn("text-sm text-primary", !compact && "mt-10")}
        role="status"
      >
        Specimen {entry.specimen}. You are on the list.
      </p>
    );
  }

  return (
    <div className={cn("w-full", !compact && "mt-8", compact ? "max-w-lg" : "max-w-lg")}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 sm:flex-row"
        noValidate
      >
        <label className="sr-only" htmlFor={compact ? "hero-email" : "list-email"}>
          Email
        </label>
        <input
          id={compact ? "hero-email" : "list-email"}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError("");
          }}
          aria-invalid={Boolean(error)}
          className="h-12 min-h-11 w-full rounded-lg bg-surface px-4 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle focus-visible:shadow-[var(--shadow-border-hover)]"
          suppressHydrationWarning
        />
        <Button type="submit" size="lg" className="shrink-0">
          Leave a signal
          <ArrowRight className="size-4" />
        </Button>
      </form>
      {error ? <p className="mt-3 text-sm text-muted">{error}</p> : null}
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <StrandMark size="nav" />
          <p className="text-sm text-muted">Aliens DNA</p>
        </div>
        <p className="text-xs uppercase tracking-mark text-subtle">
          aliensdna.com · 2026 · Sequence 00
        </p>
        <a
          href="https://x.com/XaliensDNA"
          className="text-sm text-muted transition-colors duration-[var(--motion-quick)] hover:text-fg"
          rel="noreferrer"
          target="_blank"
        >
          @XaliensDNA
        </a>
      </div>
    </footer>
  );
}
