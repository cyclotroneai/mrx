import { useEffect, useRef, useState } from "react";
import { Logo } from "./components/Logo";
import { useReveal, useScrollY } from "./lib/motion";

import heroImg from "@/imports/1_.png";
import womanOutdoorImg from "@/imports/3_.png";
import womanMatImg from "@/imports/image_copy.jpg";
import seniorDrinkImg from "@/imports/old_age_.jpg";
import seniorTabletImg from "@/imports/3_.jpg";
import kitGrassImg from "@/imports/ply_.jpg";

/* ----------------------------------------------------------------- icons -- */
const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Icon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    shield: <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
    scale: (
      <>
        <path d="M12 4v16M7 20h10" />
        <path d="M6 8l-3 5h6l-3-5zM18 8l-3 5h6l-3-5zM6 8h12" />
      </>
    ),
    leaf: (
      <>
        <path d="M4 20c0-8 6-14 16-14 0 10-6 14-16 14z" />
        <path d="M8 16c3-3 6-5 9-6" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
      </>
    ),
    protein: (
      <>
        <path d="M8 3h8v3l-1 2v11a2 2 0 01-2 2h-2a2 2 0 01-2-2V8L8 6V3z" />
        <path d="M8 10h8" />
      </>
    ),
    creatine: (
      <>
        <path d="M4 8l8-4 8 4-8 4-8-4z" />
        <path d="M4 8v8l8 4 8-4V8M12 12v8" />
      </>
    ),
    vitamins: (
      <>
        <rect x="4" y="9" width="7" height="6" rx="3" />
        <path d="M14 9h5a3 3 0 010 6h-5" />
        <path d="M7.5 9v6" />
      </>
    ),
    sports: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3l3 4-1.5 4.5h-3L9 7l3-4zM3.5 10l4.5 1 1.5 4.5-3 3M20.5 10L16 11l-1.5 4.5 3 3" />
      </>
    ),
    recovery: (
      <>
        <path d="M4 12h4l2-5 4 10 2-5h4" />
      </>
    ),
    wellness: (
      <>
        <path d="M12 21C7 17 4 13.5 4 9.5A4.5 4.5 0 0112 7a4.5 4.5 0 018 2.5c0 4-3 7.5-8 11.5z" />
      </>
    ),
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    check: <path d="M4 12l5 5L20 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    star: <path d="M12 3l2.6 5.4 6 .9-4.3 4.2 1 6-5.3-2.8L6.7 19.5l1-6L3.4 9.3l6-.9L12 3z" />,
    quote: <path d="M9 7H5v6h4V9c0 2-1 3.5-3 4M19 7h-4v6h4V9c0 2-1 3.5-3 4" />,
    whatsapp: (
      <>
        <path d="M4 20l1.4-4A8 8 0 1120 12a8 8 0 01-12 6.9L4 20z" />
        <path d="M9 9c0 3 3 6 6 6l1.5-1.5-2-1-1 1c-1-.4-2.1-1.5-2.5-2.5l1-1-1-2L9 9z" />
      </>
    ),
    instagram: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4.5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17" cy="7" r="0.6" fill="currentColor" />
      </>
    ),
    facebook: <path d="M14 8h2V5h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14v-2c0-.6.4-1 1-1z" />,
    tiktok: <path d="M14 4v9.5a3.5 3.5 0 11-3-3.46M14 4c.5 2.2 2 3.6 4 4" />,
  };
  return (
    <svg viewBox="0 0 24 24" className={className} {...iconProps}>
      {paths[name]}
    </svg>
  );
}

/* --------------------------------------------------------------- primitives */
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.4em] text-crimson">
      <span className="h-px w-8 bg-crimson/60" />
      {children}
    </span>
  );
}

/**
 * Image tile whose photo drifts against the scroll for a parallax effect,
 * driven by the tile's own position in the viewport.
 */
function Parallax({
  img,
  grade,
  speed = 0.08,
  label,
  title,
  className = "",
}: {
  img: string;
  grade: string;
  speed?: number;
  label?: string;
  title?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const fromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
          setOffset(-fromCenter * speed);
        }
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`group relative min-h-64 bg-panel ${className}`}>
      <img
        src={img}
        alt={title ?? ""}
        className={`${grade} absolute inset-0 h-[130%] w-full object-cover transition-transform duration-700 group-hover:scale-105`}
        style={{ top: "-15%", transform: `translateY(${offset}px)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      {(label || title) && (
        <div className="absolute bottom-0 left-0 p-6">
          {label && (
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-crimson">{label}</span>
          )}
          {title && (
            <div className="mt-2 font-display text-3xl font-semibold uppercase leading-none tracking-tight">
              {title}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------- data -- */
const NAV = ["Products", "Nutrition", "Why MRX", "Education", "FAQ", "Contact"];

const WHY = [
  { n: "01", t: "Authentic", i: "shield", d: "Every product sourced through authorized dealers and legitimate supply channels — nothing grey-market." },
  { n: "02", t: "Fair", i: "scale", d: "A lean trading model with sensible margins keeps quality nutrition genuinely affordable." },
  { n: "03", t: "Simple", i: "leaf", d: "A curated range built around real nutritional needs — not a wall of confusing labels." },
  { n: "04", t: "Accessible", i: "globe", d: "Better access to trusted nutrition for athletes, enthusiasts and everyday active people." },
];

const CHAIN = [
  "Authorized Sourcing",
  "Product Verification",
  "Lean Operations",
  "Sensible Margins",
  "Fairer Prices",
  "Customer",
];

const CATEGORIES = [
  { t: "Protein", i: "protein", d: "Whey, isolate & plant blends" },
  { t: "Creatine", i: "creatine", d: "Monohydrate & micronized" },
  { t: "Vitamins & Minerals", i: "vitamins", d: "Daily foundations" },
  { t: "Sports Nutrition", i: "sports", d: "Pre, intra & endurance" },
  { t: "Recovery", i: "recovery", d: "Aminos & post-training" },
  { t: "Health & Wellness", i: "wellness", d: "Omega, greens & sleep" },
];

const ARTICLES = [
  { t: "Protein 101", k: "Basics", r: "5 min" },
  { t: "How Much Protein Do You Need?", k: "Nutrition", r: "6 min" },
  { t: "Creatine Explained", k: "Science", r: "7 min" },
  { t: "How to Read a Supplement Label", k: "Guide", r: "4 min" },
  { t: "Supplements vs Whole Foods", k: "Nutrition", r: "6 min" },
  { t: "Nutrition for Active People", k: "Lifestyle", r: "5 min" },
  { t: "Recovery & Nutrition", k: "Training", r: "5 min" },
  { t: "Fitness & Longevity", k: "Longevity", r: "8 min" },
];


const FAQ = [
  { q: "Are MRX products authentic?", a: "Yes. Every item is sourced through authorized dealers, distributors and legitimate supply channels — never grey-market imports." },
  { q: "Where do MRX products come from?", a: "We source established, well-known sports nutrition brands through their authorized distribution networks." },
  { q: "Does MRX manufacture supplements?", a: "No. MRX is a trading company. We do not manufacture products — we make trusted brands more accessible." },
  { q: "Why are MRX prices competitive?", a: "A lean operating model and sensible margins let us pass better value on to you, without cutting corners on authenticity." },
  { q: "How should I choose a supplement?", a: "Start with your goal and your diet. Protein and a daily multivitamin cover most people; message us and we'll point you to the essentials." },
  { q: "Can MRX help me choose a product?", a: "Absolutely. Reach out on WhatsApp or Instagram and a real person will help you find what fits your routine and budget." },
  { q: "How can I order?", a: "Message us directly on WhatsApp or Instagram — a real person will help you place and arrange your order." },
  { q: "Do supplements replace food?", a: "No. Supplements support a balanced diet — they don't replace whole foods. Think of them as convenient, targeted additions." },
];

/* --------------------------------------------------------------------- app -- */
export default function App() {
  const rootRef = useReveal<HTMLDivElement>();
  const scrollY = useScrollY();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setScrolled(scrollY > 40), [scrollY]);

  return (
    <div ref={rootRef} className="min-h-full bg-ink text-cream">
      {/* ---------------------------------------------------------- header -- */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "border-b border-white/8 bg-ink/85 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" aria-label="MRX Sports & Nutrition home">
            <Logo className="h-7 sm:h-8" />
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase().replace(/[^a-z]/g, "")}`}
                className="font-mono text-[12px] uppercase tracking-[0.2em] text-cream/70 transition-colors hover:text-crimson"
              >
                {n}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-crimson px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-crimson-deep"
          >
            Contact
            <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </header>

      {/* ------------------------------------------------------------- hero -- */}
      <section id="top" className="relative min-h-svh overflow-hidden">
        <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.28}px)` }}>
          <img src={heroImg} alt="Athlete holding an MRX shaker in the gym" className="grade h-[118%] w-full object-cover object-[60%_20%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        </div>

        <div className="relative mx-auto flex min-h-svh max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8">
          <div className="max-w-2xl">
            <div className="reveal">
              <Kicker>Premium Nutrition · Fair Prices</Kicker>
            </div>
            <h1 className="reveal mt-6 font-display text-[15vw] font-semibold uppercase leading-[0.88] tracking-tight sm:text-[9vw] lg:text-[7.5rem]">
              Premium
              <br />
              Nutrition.
              <br />
              <span className="text-crimson">Fair Prices.</span>
            </h1>
            <p className="reveal mt-7 max-w-lg text-lg leading-relaxed text-cream/75">
              Authentic sports and nutrition products sourced through authorized channels — making quality nutrition more accessible for the whole fitness lifestyle.
            </p>
            <div className="reveal mt-9 flex flex-wrap gap-4">
              <a href="#products" className="group inline-flex items-center gap-3 rounded-full bg-crimson px-8 py-4 font-mono text-[12px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-crimson-deep">
                Explore Nutrition
                <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#why" className="inline-flex items-center gap-3 rounded-full border border-white/25 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.2em] text-cream transition-colors hover:border-crimson hover:text-crimson">
                Why MRX?
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-5 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-cream/40 sm:flex sm:right-8">
          <span className="h-8 w-px bg-cream/20" /> Fitness Today · Longevity Tomorrow
        </div>
      </section>

      {/* --------------------------------------------------------- marquee -- */}
      <div className="border-y border-white/8 bg-ink-soft py-4 overflow-hidden">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-lg uppercase tracking-wide text-cream/40">
          {Array.from({ length: 2 }).map((_, r) => (
            <span key={r} className="flex gap-10">
              {["Authenticity", "Fair Value", "Nutrition", "Fitness", "Longevity", "Transparency", "Accessibility"].map((w) => (
                <span key={w} className="flex items-center gap-10">
                  {w}
                  <span className="text-crimson">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------ philosophy -- */}
      <section id="nutrition" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <Kicker>The MRX Philosophy</Kicker>
            <h2 className="mt-6 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
              Nutrition Should Be Accessible.
            </h2>
          </div>
          <div className="reveal space-y-6 text-lg leading-relaxed text-cream/70 lg:col-span-6 lg:col-start-7">
            <p>
              MRX believes quality nutrition should never be unnecessarily expensive or confusing. Too many people are priced out of products they can trust — or overwhelmed by labels and claims designed to sell rather than to inform.
            </p>
            <p>
              We take a different route. As a lean trading company, we source established, authentic products through authorized channels and pass sensible value on to you. No manufacturing hype, no inflated markups — just trusted nutrition, made accessible.
            </p>
            <div className="flex flex-wrap gap-x-10 gap-y-4 pt-4">
              {[
                ["100%", "Authorized sourcing"],
                ["0", "Unrealistic claims"],
                ["1", "Fair, honest model"],
              ].map(([k, v]) => (
                <div key={v}>
                  <div className="font-display text-4xl font-semibold text-crimson">{k}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/50">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ why -- */}
      <section id="why" className="border-y border-white/8 bg-ink-soft py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal mb-14 max-w-xl">
            <Kicker>Why MRX</Kicker>
            <h2 className="mt-6 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
              Built on Trust,<br />Priced for Everyone.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((c) => (
              <div key={c.t} className="reveal group relative bg-ink p-8 transition-colors duration-500 hover:bg-panel">
                <div className="flex items-center justify-between">
                  <Icon name={c.i} className="h-8 w-8 text-crimson" />
                  <span className="font-mono text-xs tracking-[0.2em] text-cream/30">{c.n}</span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold uppercase tracking-tight">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">{c.d}</p>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-crimson transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- how it works -- */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ transform: `translateY(${(scrollY - 2400) * 0.06}px)` }}
        >
          <img src={womanMatImg} alt="" className="grade h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-ink/80" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Kicker>How MRX Works</Kicker>
              <h2 className="mt-6 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
                Why Can MRX Offer Better Value?
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-cream/70 lg:col-span-5">
              MRX doesn't manufacture products. Instead, we source established, authentic supplements through authorized supply channels — then run lean so the savings reach you.
            </p>
          </div>

          <div className="reveal mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {CHAIN.map((step, i) => (
              <div key={step} className="relative flex flex-col gap-4 rounded-xl border border-white/10 bg-ink/70 p-6 backdrop-blur">
                <span className="font-mono text-[11px] tracking-[0.2em] text-crimson">STEP {String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-xl font-medium uppercase leading-tight">{step}</span>
                {i < CHAIN.length - 1 && (
                  <Icon
                    name="arrow"
                    className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-crimson lg:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- categories -- */}
      <section id="products" className="border-t border-white/8 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker>Product Categories</Kicker>
              <h2 className="mt-6 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
                Everything You Train For.
              </h2>
            </div>
            <a href="#contact" className="font-mono text-[12px] uppercase tracking-[0.2em] text-crimson hover:text-ember">
              Ask MRX about a category →
            </a>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <button
                key={c.t}
                className="reveal group flex items-center gap-5 bg-ink p-8 text-left transition-colors duration-500 hover:bg-panel"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 text-crimson transition-colors duration-500 group-hover:border-crimson group-hover:bg-crimson group-hover:text-white">
                  <Icon name={c.i} className="h-7 w-7" />
                </span>
                <span>
                  <span className="block font-display text-xl font-semibold uppercase tracking-tight">{c.t}</span>
                  <span className="mt-1 block text-sm text-cream/50">{c.d}</span>
                </span>
                <Icon name="arrow" className="ml-auto h-5 w-5 text-cream/30 transition-all group-hover:translate-x-1 group-hover:text-crimson" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- education -- */}
      <section id="education" className="border-t border-white/8 bg-ink-soft py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Kicker>Nutrition Education</Kicker>
              <h2 className="mt-6 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
                Don't Just Buy Nutrition.<br />Understand It.
              </h2>
            </div>
            <p className="text-cream/60 lg:col-span-4">
              Clear, honest explainers — no jargon, no hype. Learn what actually matters before you spend.
            </p>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
            {ARTICLES.map((a) => (
              <a key={a.t} href="#education" className="reveal group flex min-h-44 flex-col justify-between bg-ink p-6 transition-colors duration-500 hover:bg-panel">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">
                  <span className="text-crimson">{a.k}</span>
                  <span>{a.r}</span>
                </div>
                <h3 className="mt-8 font-display text-xl font-medium uppercase leading-tight tracking-tight transition-colors group-hover:text-crimson">
                  {a.t}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------- fitness + longevity -- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ transform: `translateY(${(scrollY - 5200) * 0.12}px)` }}>
          <img src={seniorDrinkImg} alt="Older athlete drinking from an MRX shaker outdoors" className="grade-warm h-[120%] w-full object-cover object-[70%_30%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        </div>
        <div className="relative mx-auto flex min-h-[85svh] max-w-7xl flex-col justify-end px-5 py-24 sm:px-8">
          <div className="max-w-2xl">
            <div className="reveal"><Kicker>Fitness + Longevity</Kicker></div>
            <h2 className="reveal mt-6 font-display text-6xl font-semibold uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
              Don't Train<br />Only for Today.
            </h2>
            <p className="reveal mt-7 max-w-lg text-xl leading-relaxed text-cream/80">
              Build the habits that support the life you want tomorrow — strength, nutrition, recovery and consistency, carried across every decade.
            </p>
            <div className="reveal mt-10 flex flex-wrap gap-3">
              {["Strength", "Nutrition", "Recovery", "Consistency", "Healthy Aging", "Long-Term Performance"].map((t) => (
                <span key={t} className="rounded-full border border-cream/25 bg-ink/40 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/80 backdrop-blur">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- products -- */}
      <section className="border-t border-white/8 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal mb-14 max-w-2xl">
            <Kicker>Not Just the Gym</Kicker>
            <h2 className="mt-6 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
              Fuel for Every<br />Kind of Athlete.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/70">
              From the pitch to the pavement to the everyday active life — MRX supports the whole spectrum of sport and movement, not just the weight room.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-5 sm:grid-rows-2 lg:h-[70svh]">
            <Parallax
              img={womanOutdoorImg}
              grade="grade-warm"
              speed={0.05}
              label="Everyday Active"
              title="Move Daily"
              className="reveal overflow-hidden rounded-2xl sm:col-span-3 sm:row-span-2"
            />
            <Parallax
              img={kitGrassImg}
              grade="grade-warm"
              speed={0.08}
              label="On the Field"
              title="Play On"
              className="reveal overflow-hidden rounded-2xl sm:col-span-2"
            />
            <Parallax
              img={seniorTabletImg}
              grade="grade"
              speed={0.08}
              label="Train Smart"
              title="Track Progress"
              className="reveal overflow-hidden rounded-2xl sm:col-span-2"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ proof -- */}
      <section className="border-t border-white/8 bg-ink-soft py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker>Social Proof</Kicker>
              <h2 className="mt-6 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
                Reviews, Coming Soon.
              </h2>
            </div>
            <p className="max-w-sm text-cream/50">
              We'd rather show real words than invent them. Verified customer reviews will appear here as they arrive.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="reveal flex flex-col rounded-2xl border border-dashed border-white/12 bg-ink/40 p-8">
                <Icon name="quote" className="h-8 w-8 text-crimson/50" />
                <div className="mt-5 flex gap-1 text-cream/20">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Icon key={s} name="star" className="h-4 w-4" />
                  ))}
                </div>
                <div className="mt-5 space-y-2">
                  <div className="h-3 w-full rounded bg-white/6" />
                  <div className="h-3 w-4/5 rounded bg-white/6" />
                  <div className="h-3 w-2/3 rounded bg-white/6" />
                </div>
                <span className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/30">Awaiting verified review</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- faq -- */}
      <section id="faq" className="py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="reveal mb-14 text-center">
            <div className="flex justify-center"><Kicker>FAQ</Kicker></div>
            <h2 className="mt-6 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
              Questions, Answered Honestly.
            </h2>
          </div>
          <div className="divide-y divide-white/8 border-y border-white/8">
            {FAQ.map((f, i) => (
              <div key={f.q} className="reveal">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-display text-xl font-medium uppercase tracking-tight sm:text-2xl">{f.q}</span>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${openFaq === i ? "border-crimson bg-crimson text-white" : "border-white/25 text-cream"}`}>
                    <Icon name={openFaq === i ? "minus" : "plus"} className="h-4 w-4" />
                  </span>
                </button>
                <div className={`grid transition-all duration-500 ${openFaq === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl text-cream/65">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- contact -- */}
      <section id="contact" className="relative overflow-hidden border-t border-white/8">
        <div className="absolute inset-0" style={{ transform: `translateY(${(scrollY - 9500) * 0.08}px)` }}>
          <img src={seniorTabletImg} alt="" className="grade h-[115%] w-full object-cover object-center opacity-40" />
          <div className="absolute inset-0 bg-ink/85" />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 lg:py-36">
          <div className="reveal"><div className="flex justify-center"><Kicker>Contact · Social Selling</Kicker></div></div>
          <h2 className="reveal mt-6 font-display text-6xl font-semibold uppercase leading-[0.9] tracking-tight sm:text-7xl">
            Not Sure What<br />You Need?
          </h2>
          <p className="reveal mt-6 font-display text-3xl font-normal uppercase tracking-tight text-crimson">Talk to MRX.</p>
          <div className="reveal mt-10 flex flex-wrap justify-center gap-4">
            <a href="#contact" className="inline-flex items-center gap-3 rounded-full bg-crimson px-8 py-4 font-mono text-[12px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-crimson-deep">
              <Icon name="whatsapp" className="h-5 w-5" /> WhatsApp
            </a>
            <a href="#contact" className="inline-flex items-center gap-3 rounded-full border border-white/25 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.2em] text-cream transition-colors hover:border-crimson hover:text-crimson">
              <Icon name="instagram" className="h-5 w-5" /> Instagram
            </a>
            <a href="#contact" className="inline-flex items-center gap-3 rounded-full border border-white/25 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.2em] text-cream transition-colors hover:border-crimson hover:text-crimson">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- footer -- */}
      <footer className="border-t border-white/8 bg-ink py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Logo className="h-11" />
              <p className="mt-6 max-w-sm font-display text-2xl font-medium uppercase leading-tight tracking-tight">
                Premium Nutrition.<br /><span className="text-crimson">Fair Prices.</span>
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/50">
                Authentic sports nutrition and supplements, sourced through authorized channels and made accessible across the UAE.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:col-start-7 sm:grid-cols-3">
              {[
                ["Explore", ["Products", "Nutrition", "Why MRX", "About"]],
                ["Learn", ["Education", "FAQ", "Contact"]],
                ["Follow", ["Instagram", "Facebook", "TikTok", "WhatsApp"]],
              ].map(([h, items]) => (
                <div key={h as string}>
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/40">{h}</h4>
                  <ul className="mt-4 space-y-3">
                    {(items as string[]).map((it) => (
                      <li key={it}>
                        <a href="#top" className="text-sm text-cream/70 transition-colors hover:text-crimson">{it}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-white/8 pt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/40">
              © {new Date().getFullYear()} MRX Sports &amp; Nutrition
            </p>
            <div className="flex gap-3">
              {["instagram", "facebook", "tiktok", "whatsapp"].map((s) => (
                <a
                  key={s}
                  href="#contact"
                  aria-label={s}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream/70 transition-colors hover:border-crimson hover:bg-crimson hover:text-white"
                >
                  <Icon name={s} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
