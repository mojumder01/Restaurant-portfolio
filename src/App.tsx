import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight, CalendarCheck, Clock, Flame, MapPin, Menu as MenuIcon, Phone, Quote, Star, X } from 'lucide-react';
import { gallery, heroPhoto, menu, menuTabs, reservePhoto, restaurant, reviews, signatures, story, type MenuTab, type Spice } from './data';
import { CountUp, Eyebrow, Logo, Photo, Reveal, taka } from './ui';

const nav = [
  { href: '#signatures', label: 'Signatures' },
  { href: '#menu', label: 'Menu' },
  { href: '#story', label: 'Our story' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#visit', label: 'Visit' },
];

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-cream">Skip to content</a>
      <Header />
      <main id="main" className="overflow-x-clip">
        <Hero />
        <Ribbon />
        <Signatures />
        <Story />
        <MenuSection />
        <Gallery />
        <Reviews />
        <Reserve />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

function useScrolled(offset: number) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > offset);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [offset]);
  return scrolled;
}

function Header() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const esc = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-cream/85 shadow-[0_10px_30px_-20px_rgba(60,35,15,.5)] backdrop-blur-md' : ''}`}>
      <div className={`mx-auto flex max-w-[1240px] items-center justify-between gap-5 px-5 transition-all duration-500 sm:px-8 ${scrolled ? 'py-3' : 'py-6'}`}>
        <a href="#top" aria-label="Aurelia, back to top" className="text-ink no-underline"><Logo /></a>
        <nav aria-label="Main" className="hidden items-center gap-8 text-[13px] font-semibold uppercase tracking-[2px] lg:flex">
          {nav.map((n) => <a key={n.href} href={n.href} className="ul pb-1 text-ink-soft no-underline">{n.label}</a>)}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#reserve" className="hidden rounded-full bg-clay px-6 py-3.5 text-[13px] font-bold uppercase tracking-[2px] text-white no-underline transition hover:-translate-y-0.5 hover:bg-clay-dark hover:shadow-[0_12px_30px_-10px_rgba(168,72,31,.6)] sm:inline-block">Reserve a table</a>
          <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-line bg-white lg:hidden">
            <MenuIcon size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div role="dialog" aria-modal="true" aria-label="Site menu" className={`fixed inset-0 z-50 flex flex-col bg-cream px-6 py-6 transition-all duration-500 lg:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="flex items-center justify-between">
          <Logo />
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-line bg-white"><X size={20} aria-hidden="true" /></button>
        </div>
        <nav aria-label="Mobile" className="mt-14 flex flex-col gap-2">
          {nav.map((n, i) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className={`font-serif text-5xl text-ink no-underline transition-all duration-500 ${open ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'}`} style={{ transitionDelay: open ? `${0.08 * i + 0.1}s` : '0s' }}>{n.label}</a>
          ))}
        </nav>
        <a href="#reserve" onClick={() => setOpen(false)} className="mt-auto rounded-full bg-clay py-4 text-center text-sm font-bold uppercase tracking-[2px] text-white no-underline">Reserve a table</a>
      </div>
    </header>
  );
}

function Hero() {
  const petals = [
    { left: '54%', delay: '0s', color: '#E39A3B' }, { left: '63%', delay: '2.4s', color: '#C9512A' }, { left: '71%', delay: '4.3s', color: '#E39A3B' },
    { left: '80%', delay: '1.4s', color: '#7C9A5B' }, { left: '88%', delay: '5.8s', color: '#E39A3B' }, { left: '94%', delay: '3.4s', color: '#C9512A' },
    { left: '20%', delay: '6.6s', color: '#E39A3B' },
  ];
  return (
    <section id="top" className="relative mx-auto flex max-w-[1240px] flex-wrap items-center gap-12 px-5 pb-24 pt-32 sm:px-8 lg:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {petals.map((p, i) => <span key={i} className="petal" style={{ left: p.left, animationDelay: p.delay, background: p.color }} />)}
      </div>
      <div className="relative z-10 min-w-0 flex-[1_1_440px]">
        <p className="rise mb-5 text-xs font-bold uppercase tracking-[4px] text-clay sm:text-[13px] sm:tracking-[5px]" style={{ animationDelay: '.15s' }}>Authentic Bengali &amp; Mughlai · {restaurant.area}</p>
        <h1 className="font-serif text-[clamp(56px,7.4vw,108px)] font-medium leading-[.94] tracking-[-1px]">
          <span className="rise block" style={{ animationDelay: '.35s' }}>Where fire</span>
          <span className="rise block" style={{ animationDelay: '.55s' }}>meets <em className="text-clay">flavour</em></span>
        </h1>
        <p className="rise mt-7 max-w-[480px] text-[17px] leading-[1.75] text-muted sm:text-lg" style={{ animationDelay: '.8s' }}>
          Kacchi biryani sealed in the pot for hours, shorshe ilish in mustard, slow-cooked kala bhuna — Bengal’s great dishes, made the old way and served beautifully.
        </p>
        <div className="rise mt-10 flex flex-wrap gap-4" style={{ animationDelay: '1.05s' }}>
          <a href="#reserve" className="rounded-full bg-clay px-8 py-4 text-sm font-bold uppercase tracking-[2px] text-white no-underline transition hover:-translate-y-0.5 hover:bg-clay-dark hover:shadow-[0_12px_30px_-10px_rgba(168,72,31,.6)]">Book a table</a>
          <a href="#menu" className="rounded-full border-[1.5px] border-line bg-white px-8 py-4 text-sm font-bold uppercase tracking-[2px] text-ink no-underline transition hover:bg-sand">See the menu</a>
        </div>
        <div className="rise mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted" style={{ animationDelay: '1.25s' }}>
          <span className="flex items-center gap-2"><span className="flex text-saffron">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={16} fill="currentColor" aria-hidden="true" />)}</span><b className="text-ink">4.9</b> from 2,400+ guests</span>
          <span className="flex items-center gap-2"><Clock size={16} className="text-clay" aria-hidden="true" /> Open today until 23:00</span>
        </div>
      </div>

      <div className="relative mx-auto aspect-square w-full max-w-[540px] flex-[1_1_380px]">
        <svg className="spin absolute inset-0 h-full w-full" viewBox="0 0 480 480" aria-hidden="true">
          <circle cx="240" cy="240" r="232" fill="none" stroke="#A8481F" strokeWidth="1.4" strokeDasharray="2 12" />
          <circle cx="240" cy="8" r="8" fill="#E39A3B" />
        </svg>
        <svg className="spin-rev absolute inset-0 h-full w-full" viewBox="0 0 480 480" aria-hidden="true">
          <defs><path id="ring" d="M240,240 m-204,0 a204,204 0 1,1 408,0 a204,204 0 1,1 -408,0" /></defs>
          <text fontFamily="Manrope" fontSize="14" fontWeight="700" letterSpacing="6" fill="#8A7562">
            <textPath href="#ring">KACCHI · SHORSHE ILISH · KALA BHUNA · REZALA · FUCHKA · BORHANI · SHAHI TUKRA · </textPath>
          </text>
        </svg>
        <div className="float absolute inset-[13%]">
          <Photo photo={heroPhoto} alt="Kacchi biryani in a steel handi with borhani, salad and sides, top view" width={1000} eager className="h-full w-full rounded-full shadow-[0_40px_80px_-30px_rgba(90,45,15,.6)]" />
          <svg className="absolute -top-10 left-1/2 h-14 w-24 -translate-x-1/2" viewBox="0 0 96 56" aria-hidden="true">
            {[22, 48, 74].map((x, i) => <path key={x} className="steam" style={{ animationDelay: `${i * 0.6}s` }} d={`M${x} 54 C ${x - 10} 40, ${x + 10} 30, ${x} 14`} fill="none" stroke="#C9A27A" strokeWidth="2.4" strokeLinecap="round" />)}
          </svg>
        </div>
        <div className="float-slow absolute -left-2 bottom-[12%] rounded-2xl bg-white px-5 py-3.5 shadow-[0_20px_40px_-20px_rgba(60,35,15,.55)] sm:left-0">
          <p className="text-[10px] font-extrabold tracking-[2px] text-clay">TODAY’S POT</p>
          <p className="mt-0.5 font-serif text-xl font-semibold">Mutton kacchi</p>
          <p className="text-xs text-muted">Ready at 12:30 · 40 plates</p>
        </div>
        <div className="float absolute -right-1 top-[14%] flex items-center gap-3 rounded-full bg-ink py-2 pl-2 pr-5 text-cream shadow-[0_20px_40px_-20px_rgba(36,28,21,.8)]" style={{ animationDelay: '1.5s' }}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-saffron text-ink"><Flame size={18} aria-hidden="true" /></span>
          <span className="text-sm font-bold">Charcoal dum</span>
        </div>
      </div>
    </section>
  );
}

function Ribbon() {
  const words = ['Kacchi biryani', 'Shorshe ilish', 'Kala bhuna', 'Mutton rezala', 'Fuchka', 'Borhani', 'Shahi tukra'];
  const row = [...words, ...words];
  return (
    <div aria-hidden="true" className="relative -mx-4 my-6 -rotate-2 overflow-hidden bg-clay py-5 font-serif text-[28px] italic text-cream shadow-[0_20px_40px_-24px_rgba(126,52,20,.7)]">
      <div className="marquee">
        {row.map((w, i) => <span key={i} className="flex items-center gap-14 whitespace-nowrap">{w}<span className="text-[#F2C27E] not-italic">✦</span></span>)}
      </div>
    </div>
  );
}

function Signatures() {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  const step = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('article');
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 340) + 28), behavior: 'smooth' });
  };
  return (
    <section id="signatures" className="py-28">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
        <Reveal>
          <Eyebrow>Signature dishes</Eyebrow>
          <h2 className="max-w-[640px] font-serif text-[clamp(40px,4.6vw,66px)] font-medium leading-[1.02]">The plates Dhaka comes back for</h2>
        </Reveal>
        <div className="flex gap-3">
          <button type="button" onClick={() => step(-1)} aria-label="Previous dishes" className="flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-line bg-white transition hover:border-ink hover:bg-ink hover:text-cream"><ArrowLeft size={20} aria-hidden="true" /></button>
          <button type="button" onClick={() => step(1)} aria-label="Next dishes" className="flex h-14 w-14 items-center justify-center rounded-full bg-clay text-white transition hover:bg-clay-dark"><ArrowRight size={20} aria-hidden="true" /></button>
        </div>
      </div>
      <div ref={track} onScroll={onScroll} className="no-scrollbar mt-12 flex snap-x snap-mandatory track-pad gap-7 overflow-x-auto pb-10 pt-2">
        {signatures.map((d, i) => (
          <Reveal as="article" key={d.id} delay={i * 0.08} className="group w-[290px] flex-none snap-start sm:w-[340px]">
            <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_50px_-30px_rgba(60,35,15,.5)] transition duration-500 group-hover:-translate-y-2.5 group-hover:shadow-[0_30px_60px_-20px_rgba(60,35,15,.35)]">
              <div className="relative">
                <Photo photo={d.photo} alt={d.name} width={800} className="zoom h-[300px] sm:h-[360px]" />
                <span className="absolute left-4 top-4 rounded-full bg-cream px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[2px] text-clay">{d.tag}</span>
                <span className="absolute bottom-3 right-5 font-serif text-[64px] font-semibold leading-none text-white/90 [text-shadow:0_4px_20px_rgba(0,0,0,.35)]">0{i + 1}</span>
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-[27px] font-semibold leading-tight">{d.name}</h3>
                  <span className="whitespace-nowrap text-lg font-extrabold text-clay">{taka(d.price)}</span>
                </div>
                <p className="mt-1 font-bangla text-[15px] text-faint">{d.bn}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{d.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="h-[3px] overflow-hidden rounded-full bg-line" aria-hidden="true">
          <div className="h-full rounded-full bg-clay transition-[width] duration-300" style={{ width: `${20 + progress * 80}%` }} />
        </div>
      </div>
    </section>
  );
}

function Story() {
  const [a, b, c] = story.photos;
  return (
    <section id="story" className="bg-sand">
      <div className="mx-auto grid max-w-[1240px] items-center gap-16 px-5 py-28 sm:px-8 lg:grid-cols-2">
        <div className="relative mx-auto h-[460px] w-full max-w-[520px] sm:h-[540px]">
          <Reveal className="absolute left-0 top-6 w-[58%]">
            <div className="float -rotate-[4deg] rounded-3xl border-[7px] border-white shadow-[0_30px_60px_-30px_rgba(60,35,15,.6)]">
              <Photo photo={a} alt="A cook stirring a pot on the stove" width={700} className="h-[280px] rounded-[18px] sm:h-[340px]" />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="absolute right-0 top-0 w-[46%]">
            <div className="float-slow rotate-[3deg] rounded-3xl border-[7px] border-white shadow-[0_30px_60px_-30px_rgba(60,35,15,.6)]">
              <Photo photo={b} alt="Chicken biryani in a white bowl" width={600} className="h-[200px] rounded-[18px] sm:h-[240px]" />
            </div>
          </Reveal>
          <Reveal delay={0.3} className="absolute bottom-0 right-[6%] w-[52%]">
            <div className="float rotate-[2deg] rounded-3xl border-[7px] border-white shadow-[0_30px_60px_-30px_rgba(60,35,15,.6)]" style={{ animationDelay: '2s' }}>
              <Photo photo={c} alt="Spicy fried chicken on a black plate" width={600} className="h-[190px] rounded-[18px] sm:h-[220px]" />
            </div>
          </Reveal>
          <div className="spin absolute bottom-6 left-4 flex h-28 w-28 items-center justify-center rounded-full bg-clay text-center text-white shadow-xl" aria-hidden="true">
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full"><defs><path id="badge" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs><text fontSize="10.5" fontWeight="800" letterSpacing="3.2" fill="#FBF6EE"><textPath href="#badge">SINCE 1994 · FAMILY RECIPES · </textPath></text></svg>
            <Flame size={26} />
          </div>
        </div>
        <div>
          <Reveal>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="font-serif text-[clamp(40px,4.6vw,66px)] font-medium leading-[1.02]">Three generations, <em className="text-clay">one handi</em></h2>
            <p className="mt-7 text-[17px] leading-[1.85] text-muted">Aurelia started with a family biryani pot and a promise: no shortcuts. Our kacchi still cooks under a dough-sealed lid on charcoal, our spices are roasted and ground each morning, and our fish comes from the market at dawn.</p>
          </Reveal>
          <ol className="mt-10 grid gap-6">
            {story.pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.1 * i} className="flex gap-5">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-clay font-serif text-2xl font-semibold text-white">{i + 1}</span>
                <span><b className="block text-[17px]">{p.title}</b><span className="mt-1 block leading-relaxed text-muted">{p.body}</span></span>
              </Reveal>
            ))}
          </ol>
          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-line pt-8">
            {story.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-[clamp(38px,4vw,54px)] font-semibold leading-none text-clay"><CountUp value={s.value} decimals={s.decimals} /></dd>
                <dd className="mt-2 text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function SpiceLevel({ spice }: { spice?: Spice }) {
  if (!spice) return null;
  const n = spice === 'Hot' ? 3 : spice === 'Medium' ? 2 : 1;
  return (
    <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1px] text-clay">
      <span className="flex" aria-hidden="true">{[0, 1, 2].map((i) => <Flame key={i} size={13} className={i < n ? 'text-clay' : 'text-line'} fill="currentColor" />)}</span>
      {spice}
    </span>
  );
}

function MenuSection() {
  const [tab, setTab] = useState<MenuTab>('biryani');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent, i: number) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + menuTabs.length) % menuTabs.length;
    setTab(menuTabs[next].id);
    tabRefs.current[next]?.focus();
  };
  return (
    <section id="menu" className="mx-auto max-w-[1240px] px-5 py-28 sm:px-8">
      <Reveal className="text-center">
        <Eyebrow>The menu</Eyebrow>
        <h2 className="font-serif text-[clamp(40px,4.6vw,66px)] font-medium leading-[1.02]">Something for every craving</h2>
      </Reveal>
      <div role="tablist" aria-label="Menu sections" className="no-scrollbar -mx-5 mt-10 flex gap-2.5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {menuTabs.map((t, i) => {
          const on = t.id === tab;
          return (
            <button
              key={t.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={on}
              aria-controls="menu-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`flex-none rounded-full border-[1.5px] px-5 py-3.5 text-[13px] font-bold uppercase tracking-[1.5px] transition duration-300 ${on ? 'border-ink bg-ink text-cream' : 'border-line bg-white text-ink-soft hover:border-ink'}`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-12 grid gap-5 md:grid-cols-2 md:gap-x-10">
        {menu[tab].map((item, i) => (
          <div key={`${tab}-${item.id}`} className="pop group flex items-center gap-5 rounded-[24px] bg-white p-4 shadow-[0_12px_32px_-24px_rgba(60,35,15,.5)] transition hover:shadow-[0_20px_44px_-24px_rgba(60,35,15,.45)] sm:p-5" style={{ animationDelay: `${i * 0.07}s` }}>
            <Photo photo={item.photo} alt={item.name} width={300} className="zoom h-24 w-24 flex-none rounded-full sm:h-28 sm:w-28" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-3">
                <h3 className="font-serif text-2xl font-semibold leading-tight">{item.name}</h3>
                <span aria-hidden="true" className="mb-1.5 hidden flex-1 border-b-2 border-dotted border-line sm:block" />
                <span className="ml-auto whitespace-nowrap text-[17px] font-extrabold text-clay">{taka(item.price)}</span>
              </div>
              <p className="mt-0.5 font-bangla text-sm text-faint">{item.bn}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.desc}</p>
              <SpiceLevel spice={item.spice} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-[13px] text-muted">Prices in taka, VAT included · Heat level shown under each dish · Please tell us about any allergies</p>
    </section>
  );
}

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  useEffect(() => {
    if (open === null) return;
    const key = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') setOpen((o) => (o === null ? o : (o + 1) % gallery.length));
      if (e.key === 'ArrowLeft') setOpen((o) => (o === null ? o : (o - 1 + gallery.length) % gallery.length));
    };
    window.addEventListener('keydown', key);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = ''; };
  }, [open, close]);

  return (
    <section id="gallery" className="bg-ink text-cream">
      <div className="mx-auto max-w-[1240px] px-5 py-28 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow light>From our kitchen</Eyebrow>
            <h2 className="font-serif text-[clamp(40px,4.6vw,66px)] font-medium leading-[1.02]">A table worth the wait</h2>
          </div>
          <p className="max-w-[360px] leading-relaxed text-[#CBB9A3]">Tap any photo to see it larger.</p>
        </Reveal>
        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[230px] md:grid-cols-4 md:gap-5">
          {gallery.map((g, i) => (
            <Reveal as="figure" key={g.photo + i} delay={(i % 4) * 0.08} className={`group relative overflow-hidden rounded-[24px] ${i === 0 ? 'col-span-2 row-span-2' : ''} ${i === 3 ? 'col-span-2' : ''} ${i >= 4 ? 'md:col-span-2' : ''}`}>
              <button type="button" onClick={() => setOpen(i)} aria-label={`Open photo: ${g.caption}`} className="block h-full w-full">
                <Photo photo={g.photo} alt={g.caption} width={i === 0 ? 1200 : 700} className="zoom h-full w-full" />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
                <figcaption className="absolute bottom-4 left-5 right-5 text-left font-serif text-xl italic text-white transition duration-500 group-hover:-translate-y-1">{g.caption}</figcaption>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={gallery[open].caption} className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" onClick={close}>
          <figure className="pop relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Photo photo={gallery[open].photo} alt={gallery[open].caption} width={1600} eager className="aspect-[3/2] max-h-[80vh] w-full rounded-2xl" />
            <figcaption className="mt-4 text-center font-serif text-2xl italic text-cream">{gallery[open].caption}</figcaption>
            <button type="button" autoFocus onClick={close} aria-label="Close photo" className="absolute -top-3 right-0 flex h-12 w-12 -translate-y-full items-center justify-center rounded-full bg-cream text-ink"><X size={20} aria-hidden="true" /></button>
            <button type="button" onClick={() => setOpen((open - 1 + gallery.length) % gallery.length)} aria-label="Previous photo" className="absolute left-3 top-[40%] flex h-12 w-12 items-center justify-center rounded-full bg-cream/90 text-ink"><ArrowLeft size={20} aria-hidden="true" /></button>
            <button type="button" onClick={() => setOpen((open + 1) % gallery.length)} aria-label="Next photo" className="absolute right-3 top-[40%] flex h-12 w-12 items-center justify-center rounded-full bg-cream/90 text-ink"><ArrowRight size={20} aria-hidden="true" /></button>
          </figure>
        </div>
      )}
    </section>
  );
}

function Reviews() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % reviews.length), 6000);
    return () => window.clearInterval(t);
  }, [paused]);
  const r = reviews[i];
  return (
    <section aria-label="Guest reviews" className="relative overflow-hidden py-28" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div aria-hidden="true" className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden font-serif text-[clamp(90px,14vw,200px)] italic leading-none text-sand">
        <div className="marquee marquee-rev"><span className="whitespace-nowrap">Bhalo laglo · Darun · Ashadharon · Bhalo laglo · Darun · Ashadharon ·&nbsp;</span><span className="whitespace-nowrap">Bhalo laglo · Darun · Ashadharon · Bhalo laglo · Darun · Ashadharon ·&nbsp;</span></div>
      </div>
      <div className="relative mx-auto max-w-[860px] px-5 text-center sm:px-8">
        <Quote size={48} className="mx-auto text-saffron" aria-hidden="true" />
        <div aria-live="polite" className="min-h-[230px] sm:min-h-[200px]">
          <blockquote key={i} className="pop">
            <p className="mt-6 font-serif text-[clamp(26px,3.2vw,40px)] leading-[1.3]">“{r.text}”</p>
            <footer className="mt-6 text-sm font-bold uppercase tracking-[3px] text-clay">{r.name} <span className="font-semibold text-faint">· {r.place}</span></footer>
          </blockquote>
        </div>
        <div className="mt-8 flex justify-center gap-2.5">
          {reviews.map((rv, n) => (
            <button key={rv.name} type="button" onClick={() => setI(n)} aria-label={`Show review ${n + 1} of ${reviews.length}`} aria-current={n === i} className={`h-2.5 rounded-full transition-all duration-500 ${n === i ? 'w-10 bg-clay' : 'w-2.5 bg-line hover:bg-faint'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

const times = ['12:30', '13:30', '14:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

function Reserve() {
  const today = new Date();
  const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const [form, setForm] = useState({ name: '', phone: '', date: iso(new Date(today.getTime() + 86400000)), time: '20:00', guests: '4', note: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (form.name.trim().length < 2) err.name = 'Please enter your name.';
    if (!/^\+?[0-9\s-]{10,16}$/.test(form.phone.trim())) err.phone = 'Please enter a valid phone number, e.g. 01712 345678.';
    if (!form.date || form.date < iso(today)) err.date = 'Please pick today or a later date.';
    setErrors(err);
    if (Object.keys(err).length === 0) setDone(true);
  };

  const field = 'mt-2 w-full font-medium normal-case tracking-normal rounded-2xl border-[1.5px] border-line bg-cream px-4 py-3.5 text-[15px] text-ink outline-none transition focus:border-clay focus:bg-white';
  const label = 'block text-[11px] font-extrabold uppercase tracking-[2px] text-ink-soft';
  const nice = new Date(form.date + 'T00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <section id="reserve" className="mx-auto max-w-[1240px] px-5 pb-28 sm:px-8">
      <Reveal className="grid overflow-hidden rounded-[36px] bg-white shadow-[0_40px_80px_-50px_rgba(60,35,15,.6)] lg:grid-cols-[1fr_1.1fr]">
        <div className="relative min-h-[320px]">
          <Photo photo={reservePhoto} alt="Aurelia’s dining room in the evening" width={1000} className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
          <div className="relative flex h-full flex-col justify-end p-8 text-cream sm:p-10">
            <span className="w-fit rounded-full bg-saffron px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[2px] text-ink">Every Friday</span>
            <h3 className="mt-4 font-serif text-4xl font-medium leading-tight">Friday family feast</h3>
            <p className="mt-2 max-w-sm leading-relaxed text-[#E8DCCB]">Kacchi, rezala, roast, borhani and dessert for the whole table — ৳3,990 for four.</p>
          </div>
        </div>
        <div className="p-7 sm:p-12">
          {done ? (
            <div className="pop flex h-full flex-col items-start justify-center" role="status">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-leaf/15 text-leaf"><CalendarCheck size={30} aria-hidden="true" /></span>
              <h2 className="mt-6 font-serif text-[44px] font-medium leading-tight">Thank you, {form.name.trim().split(' ')[0]}!</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-muted">We’ve noted a table for <b className="text-ink">{form.guests}</b> on <b className="text-ink">{nice}</b> at <b className="text-ink">{form.time}</b>. We’ll call {form.phone} to confirm.</p>
              <p className="mt-2 text-sm text-faint">This is a demo website — no real booking was made.</p>
              <button type="button" onClick={() => setDone(false)} className="mt-8 rounded-full border-[1.5px] border-line px-6 py-3 text-sm font-bold uppercase tracking-[2px] transition hover:bg-sand">Make another booking</button>
            </div>
          ) : (
            <>
              <Eyebrow>Reservations</Eyebrow>
              <h2 className="font-serif text-[clamp(38px,4vw,54px)] font-medium leading-[1.04]">Save a seat at our table</h2>
              <form noValidate onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2">
                <label className={label}>Name
                  <input className={field} value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} placeholder="Your name" />
                  {errors.name && <span id="err-name" className="mt-1.5 block text-xs normal-case tracking-normal text-clay">{errors.name}</span>}
                </label>
                <label className={label}>Phone
                  <input className={field} value={form.phone} onChange={set('phone')} type="tel" autoComplete="tel" inputMode="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'err-phone' : undefined} placeholder="01712 345678" />
                  {errors.phone && <span id="err-phone" className="mt-1.5 block text-xs normal-case tracking-normal text-clay">{errors.phone}</span>}
                </label>
                <label className={label}>Date
                  <input className={field} value={form.date} onChange={set('date')} type="date" min={iso(today)} aria-invalid={!!errors.date} aria-describedby={errors.date ? 'err-date' : undefined} />
                  {errors.date && <span id="err-date" className="mt-1.5 block text-xs normal-case tracking-normal text-clay">{errors.date}</span>}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={label}>Time
                    <select className={field} value={form.time} onChange={set('time')}>{times.map((t) => <option key={t}>{t}</option>)}</select>
                  </label>
                  <label className={label}>Guests
                    <select className={field} value={form.guests} onChange={set('guests')}>{['1', '2', '3', '4', '5', '6', '8', '10+'].map((g) => <option key={g}>{g}</option>)}</select>
                  </label>
                </div>
                <label className={`${label} sm:col-span-2`}>Special request <span className="font-semibold normal-case tracking-normal text-faint">(optional)</span>
                  <textarea className={`${field} min-h-[96px] resize-y`} value={form.note} onChange={set('note')} placeholder="Birthday, high chair, window table…" />
                </label>
                <button type="submit" className="rounded-full bg-clay px-8 py-4 text-sm font-bold uppercase tracking-[2px] text-white transition hover:-translate-y-0.5 hover:bg-clay-dark hover:shadow-[0_12px_30px_-10px_rgba(168,72,31,.6)] sm:col-span-2">Request table</button>
                <p className="text-sm text-muted sm:col-span-2">Prefer to call? <a href={restaurant.phoneHref} className="font-bold text-clay">{restaurant.phone}</a></p>
              </form>
            </>
          )}
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer id="visit" className="bg-sand pb-28 pt-24 lg:pb-12">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs leading-relaxed text-muted">Bengal’s great dishes, cooked the old way in the heart of Gulshan.</p>
        </div>
        <div>
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[3px] text-clay">Find us</p>
          <p className="flex gap-2 leading-relaxed"><MapPin size={18} className="mt-1 flex-none text-clay" aria-hidden="true" />{restaurant.address}</p>
          <a className="ul mt-3 inline-block font-bold text-ink no-underline" href="https://www.google.com/maps/search/?api=1&query=Gulshan%202%20Dhaka" target="_blank" rel="noreferrer">Get directions →</a>
        </div>
        <div>
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[3px] text-clay">Opening hours</p>
          {restaurant.hours.map((h) => <p key={h.days} className="leading-relaxed"><span className="block text-muted">{h.days}</span><b>{h.time}</b></p>)}
        </div>
        <div>
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[3px] text-clay">Contact</p>
          <p className="leading-loose"><a className="ul text-ink no-underline" href={restaurant.phoneHref}>{restaurant.phone}</a><br /><a className="ul text-ink no-underline" href={`mailto:${restaurant.email}`}>{restaurant.email}</a></p>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1240px] flex-wrap justify-between gap-3 border-t border-line px-5 pt-6 text-xs text-muted sm:px-8">
        <p>© {new Date().getFullYear()} Aurelia · A demo website designed and built by <a className="font-bold text-clay" href="https://mojumder01.github.io/muntasir_Portfolio/">Md Muntasir Mamun Mojumder</a></p>
        <p>Photos from <a className="text-clay" href="https://unsplash.com" target="_blank" rel="noreferrer">Unsplash</a></p>
      </div>
    </footer>
  );
}

function MobileBar() {
  const show = useScrolled(560);
  return (
    <div className={`fixed inset-x-3 bottom-3 z-40 flex gap-2.5 rounded-full bg-white p-2 shadow-[0_18px_40px_-16px_rgba(60,35,15,.55)] transition-all duration-500 lg:hidden ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-24 opacity-0'}`}>
      <a href={restaurant.phoneHref} className="flex flex-1 items-center justify-center gap-2 rounded-full border-[1.5px] border-line py-3.5 text-[13px] font-extrabold tracking-[1px] text-ink no-underline"><Phone size={16} aria-hidden="true" /> CALL</a>
      <a href="#reserve" className="flex-[2] rounded-full bg-clay py-3.5 text-center text-[13px] font-extrabold tracking-[1px] text-white no-underline">RESERVE A TABLE</a>
    </div>
  );
}
