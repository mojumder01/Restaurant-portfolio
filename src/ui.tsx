import { useEffect, useRef, useState, type ReactNode } from 'react';

// Unsplash ids become sized image links; anything with a slash is used as-is.
export function photoUrl(photo: string, width = 1200) {
  if (photo.includes('/')) return photo;
  return `https://unsplash.com/photos/${photo}/download?force=true&w=${width}`;
}

const fallbackTones = ['#E9C58F', '#C98D5A', '#E2B26B', '#D9A07A', '#B97A4F'];

// Image with a warm placeholder underneath, shown while loading or if the photo fails.
export function Photo({ photo, alt, width, className = '', imgClassName = '', eager = false }: {
  photo: string;
  alt: string;
  width?: number;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');
  const tone = fallbackTones[[...photo].reduce((n, c) => n + c.charCodeAt(0), 0) % fallbackTones.length];
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: `radial-gradient(circle at 35% 30%, #F6DDB0, ${tone} 75%)` }}>
      {state === 'error' && (
        <span className="absolute inset-0 flex items-center justify-center p-4 text-center font-serif text-lg italic text-ink/70">{alt}</span>
      )}
      {state !== 'error' && (
        <img
          src={photoUrl(photo, width)}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setState('ok')}
          onError={() => setState('error')}
          className={`h-full w-full object-cover transition-opacity duration-700 ${state === 'ok' ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        />
      )}
    </div>
  );
}

// Adds the `in` class once the element scrolls into view.
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'article' | 'li' | 'figure';
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref as never} className={`reveal ${shown ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </Tag>
  );
}

// Counts up from 0 when scrolled into view.
export function CountUp({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      if (reduce) { setN(value); return; }
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1600);
        setN(value * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{n.toFixed(decimals)}</span>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`mb-4 text-[13px] font-bold uppercase tracking-[5px] ${light ? 'text-[#E9A65A]' : 'text-clay'}`}>{children}</p>;
}

export const taka = (n: number) => '৳' + n.toLocaleString('en-US');

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <svg width="36" height="36" viewBox="0 0 34 34" aria-hidden="true">
        <circle cx="17" cy="17" r="15.5" fill="none" stroke={light ? '#E39A3B' : '#A8481F'} strokeWidth="1.3" />
        <path d="M10 24 L17 9 L24 24 M12.8 18.5 H21.2" fill="none" stroke={light ? '#E39A3B' : '#A8481F'} strokeWidth="1.5" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[26px] tracking-[6px]">AURELIA</span>
        <span className={`mt-1 text-[9px] tracking-[4px] ${light ? 'text-[#CBB9A3]' : 'text-muted'}`}>BENGALI KITCHEN</span>
      </span>
    </span>
  );
}
