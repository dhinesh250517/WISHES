import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { characterCards, letterText } from "@/lib/birthday-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday Dharani — A Wish Made For You" },
      {
        name: "description",
        content:
          "A little corner of the internet made only for Dharani — candles, a letter, and ten reasons she is unforgettable.",
      },
      { property: "og:title", content: "Happy Birthday Dharani" },
      {
        property: "og:description",
        content: "Candles, a letter, and ten reasons you are unforgettable. Tap to begin.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayExperience,
});

type Stage =
  | "candle"
  | "countdown"
  | "blow"
  | "wish"
  | "gift"
  | "letter"
  | "cards"
  | "finale";

/* ------------------------------------------------------------------ */
/*  Ambient floating confetti hearts                                   */
/* ------------------------------------------------------------------ */
const CONFETTI = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  delay: (i * 0.7) % 9,
  duration: 7 + ((i * 1.3) % 6),
  size: 10 + ((i * 5) % 14),
  hue: i % 3,
}));

function Ambient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {CONFETTI.map((c, i) => (
        <span
          key={i}
          className="animate-float-up absolute bottom-[-4vh]"
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
            fontSize: c.size,
            color:
              c.hue === 0 ? "var(--gold)" : c.hue === 1 ? "var(--rose)" : "var(--muted-foreground)",
          }}
        >
          {c.hue === 2 ? "✦" : "❤"}
        </span>
      ))}
      <div className="absolute left-1/2 top-0 h-[60vh] w-[120vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--secondary),transparent_65%)] opacity-60" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage 1 — The candle                                               */
/* ------------------------------------------------------------------ */
function CandleScene({ onStart }: { onStart: () => void }) {
  return (
    <div className="animate-stage-in flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="mb-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">
        a wish is waiting
      </p>
      <h1 className="font-display mb-10 text-3xl font-semibold text-gold sm:text-4xl">
        For Someone Special
      </h1>

      <div className="relative mb-14 flex flex-col items-center">
        <div className="animate-glow-pulse absolute -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,var(--gold),transparent_70%)] opacity-60 blur-md" />
        {/* flame */}
        <div className="animate-flicker relative z-10 mb-1 h-12 w-6 rounded-t-full rounded-b-[40%] bg-[linear-gradient(to_top,oklch(0.65_0.2_45),var(--gold),oklch(0.95_0.08_95))] shadow-[0_0_30px_10px_color-mix(in_oklab,var(--gold)_45%,transparent)]" />
        {/* wick + candle */}
        <div className="h-2 w-1 bg-muted-foreground" />
        <div className="h-44 w-12 rounded-t-lg bg-[linear-gradient(90deg,var(--rose),oklch(0.8_0.14_350)_45%,var(--rose))] shadow-[inset_0_-6px_12px_rgba(0,0,0,0.35)] sm:h-52" />
        <div className="mt-1 h-3 w-24 rounded-full bg-secondary shadow-lg" />
        <div className="animate-sparkle absolute -left-14 top-6 text-xl text-gold">✦</div>
        <div className="animate-sparkle absolute -right-12 top-20 text-sm text-rose" style={{ animationDelay: "0.9s" }}>✦</div>
      </div>

      <button
        onClick={onStart}
        className="rounded-full border border-gold/60 bg-gold/10 px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.3em] text-gold transition-all hover:scale-105 hover:bg-gold hover:text-primary-foreground active:scale-95"
      >
        Begin
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage 2 — Countdown 3 · 2 · 1                                      */
/* ------------------------------------------------------------------ */
function CountdownScene({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(3);
  useEffect(() => {
    if (n === 0) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setN((v) => v - 1), 950);
    return () => clearTimeout(t);
  }, [n, onDone]);

  return (
    <div className="flex min-h-dvh items-center justify-center">
      {n > 0 && (
        <span
          key={n}
          className="animate-count-pop font-display text-[9rem] font-bold text-gold drop-shadow-[0_0_40px_color-mix(in_oklab,var(--gold)_50%,transparent)] sm:text-[13rem]"
        >
          {n}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage 3 — Blow the candle                                          */
/* ------------------------------------------------------------------ */
function BlowScene({ onBlown }: { onBlown: () => void }) {
  const [blown, setBlown] = useState(false);
  const handle = () => {
    if (blown) return;
    setBlown(true);
    setTimeout(onBlown, 1900);
  };

  return (
    <div className="animate-stage-in flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="mb-10 text-sm uppercase tracking-[0.35em] text-muted-foreground">
        make a wish &amp; blow the candle
      </p>
      <button
        onClick={handle}
        aria-label="Blow out the candle"
        className="group relative flex flex-col items-center outline-none"
      >
        <div className="animate-glow-pulse absolute -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,var(--gold),transparent_70%)] opacity-60 blur-md" />
        {!blown ? (
          <div className="animate-flicker relative z-10 mb-1 h-12 w-6 cursor-pointer rounded-t-full rounded-b-[40%] bg-[linear-gradient(to_top,oklch(0.65_0.2_45),var(--gold),oklch(0.95_0.08_95))] shadow-[0_0_30px_10px_color-mix(in_oklab,var(--gold)_45%,transparent)] transition-transform group-hover:scale-110 group-active:scale-75" />
        ) : (
          <div className="relative z-10 mb-1 flex h-12 w-6 items-end justify-center">
            <div className="animate-smoke h-8 w-4 rounded-full bg-muted-foreground/40 blur-[3px]" />
          </div>
        )}
        <div className="h-2 w-1 bg-muted-foreground" />
        <div className="h-44 w-12 rounded-t-lg bg-[linear-gradient(90deg,var(--rose),oklch(0.8_0.14_350)_45%,var(--rose))] shadow-[inset_0_-6px_12px_rgba(0,0,0,0.35)] sm:h-52" />
        <div className="mt-1 h-3 w-24 rounded-full bg-secondary" />
      </button>
      <p className="mt-10 font-hand text-2xl text-foreground/80">
        {blown ? "✨ wish received…" : "tap the flame to blow"}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage 4 — Typewriter "Happy Birthday Dharani"                      */
/* ------------------------------------------------------------------ */
const WISH_TEXT = "Happy Birthday Dharani";

function WishScene({ onNext }: { onNext: () => void }) {
  const [shown, setShown] = useState(0);
  const done = shown >= WISH_TEXT.length;

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setShown((v) => v + 1), WISH_TEXT[shown] === " " ? 260 : 130);
    return () => clearTimeout(t);
  }, [shown, done]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl md:text-7xl">
        {WISH_TEXT.slice(0, shown).split(" ").map((word, wi, arr) => (
          <span
            key={wi}
            className={
              wi === arr.length - 1 && wi >= 2
                ? "bg-gradient-to-r from-gold via-rose to-gold bg-clip-text text-transparent"
                : "text-foreground"
            }
          >
            {word}
            {wi < arr.length - 1 ? " " : ""}
          </span>
        ))}
        {!done && <span className="animate-pulse text-gold">|</span>}
      </h1>
      {done && (
        <button
          onClick={onNext}
          className="animate-stage-in mt-14 rounded-full border border-rose/60 bg-rose/10 px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.3em] text-rose transition-all hover:scale-105 hover:bg-rose hover:text-accent-foreground active:scale-95"
        >
          Open Your Surprise
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage 5 — The gift box                                             */
/* ------------------------------------------------------------------ */
function GiftScene({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);
  const idRef = useRef(0);

  const handle = () => {
    if (opening) return;
    setOpening(true);
    setHearts(Array.from({ length: 14 }, () => idRef.current++));
    setTimeout(onOpen, 1500);
  };

  return (
    <div className="animate-stage-in flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="mb-12 text-sm uppercase tracking-[0.35em] text-muted-foreground">
        something is wrapped for you
      </p>

      <button onClick={handle} aria-label="Open the gift" className="group relative outline-none">
        {hearts.map((id) => {
          const angle = (id / hearts.length) * Math.PI * 2;
          return (
            <span
              key={id}
              className="animate-heart-burst absolute left-1/2 top-1/3 text-2xl"
              style={
                {
                  "--tx": `${Math.cos(angle) * 130}px`,
                  "--ty": `${Math.sin(angle) * 130 - 40}px`,
                } as React.CSSProperties
              }
            >
              ❤️
            </span>
          );
        })}

        <div className={opening ? "" : "animate-box-shake group-hover:[animation-play-state:paused]"}>
          {/* lid */}
          <div
            className={`relative z-10 mx-auto -mb-1 h-10 w-44 rounded-md bg-gold shadow-lg sm:w-52 ${
              opening ? "animate-lid-pop" : ""
            }`}
          >
            <div className="absolute inset-y-0 left-1/2 w-5 -translate-x-1/2 bg-rose" />
            {/* bow */}
            <div className="absolute -top-5 left-1/2 flex -translate-x-1/2 gap-1">
              <div className="h-6 w-6 rounded-full border-4 border-rose bg-transparent" />
              <div className="h-6 w-6 rounded-full border-4 border-rose bg-transparent" />
            </div>
          </div>
          {/* box */}
          <div className="relative h-40 w-40 rounded-b-md bg-gradient-to-b from-gold to-oklch(0.7_0.15_88) shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] sm:h-48 sm:w-48">
            <div className="absolute inset-y-0 left-1/2 w-5 -translate-x-1/2 bg-rose" />
            {opening && (
              <div className="animate-glow-pulse absolute inset-x-4 -top-2 h-8 rounded-full bg-[radial-gradient(ellipse,var(--parchment),transparent_75%)]" />
            )}
          </div>
        </div>
      </button>

      <p className="mt-12 font-hand text-2xl text-foreground/80">
        {opening ? "it's opening…" : "tap the gift to open"}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage 6 — The old letter                                           */
/* ------------------------------------------------------------------ */
function LetterScene({ onNext }: { onNext: () => void }) {
  const [unfolded, setUnfolded] = useState(false);

  return (
    <div className="animate-stage-in flex min-h-dvh flex-col items-center justify-center px-5 py-14">
      <div
        className={`relative w-full max-w-lg cursor-pointer transition-transform duration-500 ${
          unfolded ? "scale-100" : "scale-90 hover:scale-95"
        }`}
        onClick={() => setUnfolded(true)}
        style={{ perspective: "1200px" }}
      >
        <div className="rounded-sm bg-parchment p-7 pb-10 text-ink shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),inset_0_0_60px_rgba(120,80,20,0.15)] sm:p-10">
          <div className="pointer-events-none absolute inset-2 rounded-sm border border-ink/15" />
          <p className="mb-5 text-right text-xs uppercase tracking-[0.3em] text-ink/50">
            on your birthday
          </p>
          <div className="font-hand whitespace-pre-line text-xl leading-relaxed sm:text-2xl">
            {letterText}
          </div>
          <div className="mt-6 flex justify-end">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-rose/60 font-display text-lg text-rose/80">
              D
            </div>
          </div>
        </div>

        {/* flap */}
        {!unfolded && (
          <div className="absolute inset-0 flex items-center justify-center rounded-sm bg-parchment/95 shadow-2xl backdrop-blur-[1px]">
            <span className="font-hand text-2xl text-ink/70">tap to unfold the letter ✉️</span>
          </div>
        )}
      </div>

      {unfolded && (
        <button
          onClick={onNext}
          className="animate-stage-in mt-10 rounded-full border border-gold/60 bg-gold/10 px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.3em] text-gold transition-all hover:scale-105 hover:bg-gold hover:text-primary-foreground active:scale-95"
        >
          See More
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage 7 — Ten little pages about her                               */
/* ------------------------------------------------------------------ */
function CardsScene({ onFinish }: { onFinish: () => void }) {
  const [i, setI] = useState(0);
  const [flipKey, setFlipKey] = useState(0);
  const card = characterCards[i]!;

  const next = () => {
    if (i === characterCards.length - 1) {
      onFinish();
      return;
    }
    setI((v) => v + 1);
    setFlipKey((k) => k + 1);
  };

  return (
    <div className="animate-stage-in flex min-h-dvh flex-col items-center justify-center px-5 py-14">
      <p className="mb-6 text-xs uppercase tracking-[0.35em] text-muted-foreground">
        ten little truths about you
      </p>

      <button
        key={flipKey}
        onClick={next}
        className="animate-stage-in w-full max-w-md rounded-lg bg-parchment p-8 text-center text-ink shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),inset_0_0_50px_rgba(120,80,20,0.12)] transition-transform hover:-translate-y-1 active:translate-y-0 sm:p-10"
      >
        <span className="font-display text-5xl text-rose/70">{i + 1}</span>
        <h2 className="font-display mt-3 text-2xl font-semibold sm:text-3xl">{card.title}</h2>
        <div className="mx-auto mt-4 h-px w-16 bg-rose/40" />
        <p className="font-hand mt-5 text-xl leading-relaxed sm:text-2xl">{card.text}</p>
        <p className="mt-7 text-xs uppercase tracking-[0.3em] text-ink/50">
          {i === characterCards.length - 1 ? "tap for the ending" : "tap for the next page"}
        </p>
      </button>

      {/* progress dots */}
      <div className="mt-8 flex gap-2">
        {characterCards.map((_, d) => (
          <span
            key={d}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              d === i ? "w-6 bg-gold" : d < i ? "w-1.5 bg-rose" : "w-1.5 bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage 8 — Finale                                                   */
/* ------------------------------------------------------------------ */
function FinaleScene() {
  return (
    <div className="animate-stage-in flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <div className="animate-glow-pulse absolute h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--rose),transparent_70%)] opacity-30 blur-2xl" />
      <p className="mb-4 text-sm uppercase tracking-[0.4em] text-muted-foreground">
        and so, dear dharani —
      </p>
      <h1 className="font-display relative text-4xl font-bold leading-tight sm:text-6xl">
        <span className="bg-gradient-to-r from-gold via-rose to-gold bg-clip-text text-transparent">
          Be Happy Forever,
        </span>
        <br />
        <span className="text-foreground">You Bestestesttt One</span>
      </h1>
      <p className="font-hand mt-8 max-w-md text-2xl leading-relaxed text-foreground/85 sm:text-3xl">
        May every candle you ever blow out come true. Today, tomorrow, and always — the world is
        better with you in it.
      </p>
      <div className="mt-10 flex gap-3 text-3xl">
        <span className="animate-sparkle">🎂</span>
        <span className="animate-sparkle" style={{ animationDelay: "0.4s" }}>✨</span>
        <span className="animate-sparkle" style={{ animationDelay: "0.8s" }}>❤️</span>
      </div>
      <p className="mt-12 text-xs uppercase tracking-[0.35em] text-muted-foreground">
        — with love, always —
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Conductor                                                          */
/* ------------------------------------------------------------------ */
function BirthdayExperience() {
  const [stage, setStage] = useState<Stage>("candle");
  const go = useCallback((s: Stage) => () => setStage(s), []);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-background">
      <Ambient />
      <div className="relative z-10">
        {stage === "candle" && <CandleScene onStart={go("countdown")} />}
        {stage === "countdown" && <CountdownScene onDone={go("blow")} />}
        {stage === "blow" && <BlowScene onBlown={go("wish")} />}
        {stage === "wish" && <WishScene onNext={go("gift")} />}
        {stage === "gift" && <GiftScene onOpen={go("letter")} />}
        {stage === "letter" && <LetterScene onNext={go("cards")} />}
        {stage === "cards" && <CardsScene onFinish={go("finale")} />}
        {stage === "finale" && <FinaleScene />}
      </div>
    </main>
  );
}
