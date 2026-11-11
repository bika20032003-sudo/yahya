import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetUrl } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const POINTS = [
  { name: 'أوباري', note: 'نقطة البداية — قرب حقل الشرارة النفطي', at: 8, km: 'كم ٠' },
  { name: 'العوينات', note: 'عبور صحراء فزان المفتوحة', at: 36, km: 'كم ١٨٠' },
  { name: 'غات', note: 'بوابة الجنوب الغربي — جبال أكاكوس', at: 68, km: 'كم ٣١٠' },
  { name: 'الحدود الجزائرية', note: 'ربط تجاري وخدمي عبر الحدود', at: 92, km: 'كم ٣٦٠' },
];

export default function RouteMap() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'st-route',
          trigger: root.current,
          start: 'top top',
          end: '+=240%',
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo('.route-line', { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 4 }, 0);
      tl.fromTo('.route-line-v', { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: 4 }, 0);

      gsap.utils.toArray<HTMLElement>('.route-point').forEach((p, i) => {
        tl.fromTo(
          p,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 0.6 },
          0.3 + i * 0.8
        );
      });

      tl.fromTo('.route-bg', { scale: 1.05, yPercent: -2 }, { scale: 1.0, yPercent: 2, ease: 'none', duration: 4 }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="route" className="relative h-screen overflow-hidden">
      <div className="cine-bg route-bg" style={{ backgroundImage: `url(${assetUrl('images/acacus.webp')})`, backgroundPosition: 'center center', backgroundSize: 'cover' }} />
      <div className="cine-veil" />

      <div className="relative z-10 flex h-full flex-col justify-center px-5 md:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-2 md:mb-4 text-xs md:text-sm font-bold tracking-normal text-[var(--amber)] flex items-center gap-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <span>٠٣</span>
            <span className="opacity-40">—</span>
            <span>المسار</span>
          </p>
          <h2 className="font-display mb-6 md:mb-20 text-2xl sm:text-3xl md:text-6xl text-[var(--bone)] leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            من واحة أوباري إلى مدينة غات
          </h2>

          {/* المسار لسطح المكتب (شاشات متوسطة وكبيرة) */}
          <div className="relative hidden md:block h-44 lg:h-48">
            <div className="absolute top-1/2 right-0 left-0 h-px bg-[var(--bone)]/20" />
            <div
              className="route-line absolute top-1/2 right-0 left-0 h-[3px] origin-right bg-gradient-to-l from-[var(--amber)] to-[var(--gold)]"
              style={{ transform: 'scaleX(0)' }}
            />
            {POINTS.map((p, i) => (
              <div
                key={i}
                className="route-point absolute top-1/2 flex w-44 -translate-y-1/2 flex-col items-center text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
                style={{ right: `calc(${p.at}% - 5.5rem)`, opacity: 0 }}
              >
                <span className="route-dot block h-3.5 w-3.5 rounded-full bg-[var(--amber)] shadow-[0_0_12px_rgba(232,147,44,0.6)]" />
                <span className="mt-4 font-display text-xl text-[var(--bone)]">{p.name}</span>
                <span className="mt-1 text-xs font-light leading-relaxed text-[var(--bone)]/90">
                  {p.note}
                </span>
              </div>
            ))}
          </div>

          {/* المسار للشاشات الصغيرة والهواتف (عمودي بدون أي تداخل إطلاقاً) */}
          <div className="relative block md:hidden max-w-md mx-auto my-2">
            <div className="absolute top-3 bottom-3 right-[15px] w-px bg-[var(--bone)]/20" />
            <div
              className="route-line-v absolute top-3 bottom-3 right-[14px] w-[3px] origin-top bg-gradient-to-b from-[var(--amber)] to-[var(--gold)]"
              style={{ transform: 'scaleY(0)' }}
            />

            <div className="space-y-4 bg-[#0a0a0b]/60 p-4 rounded-2xl backdrop-blur-sm border border-[var(--bone)]/10 shadow-2xl">
              {POINTS.map((p, i) => (
                <div
                  key={i}
                  className="route-point relative pr-9 flex flex-col drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
                  style={{ opacity: 0 }}
                >
                  <span className="route-dot absolute right-[8px] top-1.5 h-3.5 w-3.5 rounded-full bg-[var(--amber)] shadow-[0_0_10px_rgba(232,147,44,0.7)]" />
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base text-[var(--bone)]">{p.name}</h3>
                    <span className="text-[10px] font-semibold text-[var(--amber)] num-latin bg-[var(--amber)]/20 px-1.5 py-0.5 rounded border border-[var(--amber)]/35">
                      {p.km}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] font-light leading-relaxed text-[var(--bone)]/90">
                    {p.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-5 md:mt-14 max-w-md text-xs md:text-sm font-light leading-relaxed text-[var(--bone)]/60">
            يتفرع من أوباري شمالاً الطريق نحو سبها ومرزق، ليشكّل المحور عقدةَ ربطٍ لكامل إقليم فزان.
          </p>
        </div>
      </div>
    </section>
  );
}
