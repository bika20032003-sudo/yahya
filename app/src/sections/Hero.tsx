import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetUrl } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'st-hero',
          trigger: root.current,
          start: 'top top',
          end: '+=180%',
          scrub: 1,
          pin: true,
        },
      });

      const isMobile = window.innerWidth < 768;

      // حركة خلفية سينمائية ناعمة (على الشاشات الكبيرة فقط للحفاظ على نقاء الشاشة بدون ضبابية على الهواتف)
      if (!isMobile) {
        tl.fromTo('.hero-bg', { scale: 1.06 }, { scale: 1.0, ease: 'none' }, 0);
      }

      tl.fromTo('.hero-veil-dark', { opacity: 0.35 }, { opacity: 0.10, ease: 'none' }, 0)
        // انتقال المحتوى كاملاً لأعلى مع التلاشي السلس لمنع أي تداخل بين العناصر
        .to('.hero-content', { yPercent: -35, opacity: 0, ease: 'power1.in' }, 0.05)
        .to('.hero-cue', { opacity: 0, ease: 'none' }, 0.05);

      // دخول أولي فخم للعنوان والعناصر
      gsap.from('.hero-title-1 .reveal-line > span, .hero-title-2 .reveal-line > span', {
        yPercent: 115,
        duration: 1.3,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.2,
      });
      gsap.from('.hero-kicker', { opacity: 0, y: 15, duration: 0.8, delay: 0.7, ease: 'power2.out' });
      gsap.from('.hero-sub', { opacity: 0, y: 20, duration: 0.9, delay: 0.9, ease: 'power2.out' });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="hero" className="relative h-screen overflow-hidden">
      {/* خلفية الواجهة فائقة الدقة بنظام Responsive متكامل (عمودي للهاتف وأفقي 4K للشاشات) */}
      <div className="cine-bg hero-bg absolute inset-0 overflow-hidden">
        <picture className="w-full h-full block">
          <source media="(max-width: 768px)" srcSet={assetUrl('images/hero-mobile.webp')} type="image/webp" />
          <source media="(min-width: 769px)" srcSet={assetUrl('images/hero.webp')} type="image/webp" />
          <img
            src={assetUrl('images/hero.webp')}
            alt="طريق أوباري غات"
            className="w-full h-full object-cover object-center"
            loading="eager"
            decoding="sync"
          />
        </picture>
      </div>
      <div className="cine-veil" />
      <div className="hero-veil-dark absolute inset-0 bg-[var(--ink)] opacity-[0.35]" />

      <div className="hero-content relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 text-center max-w-5xl mx-auto">
        <div className="hero-kicker mb-3 md:mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--amber)]/35 bg-[#0a0a0b]/80 px-3 py-1.5 sm:px-3.5 backdrop-blur-md shadow-[0_2px_12px_rgba(232,147,44,0.18)] max-w-[92vw]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--amber)] animate-pulse" />
          <span className="text-[10px] sm:text-xs md:text-sm font-bold text-[var(--amber)] tracking-normal text-center leading-normal">
            حكومة الوحدة الوطنية — خطة عودة الحياة
          </span>
        </div>

        {/* العنوان الرئيسي: "طريق" بالسطر الأول، و"أوباري — غات" بالسطر الثاني كوحدة واحدة دون انكسار أو قص */}
        <div className="hero-title-wrap w-full py-1 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
          <h1 className="font-display text-[clamp(2.5rem,7.2vw,6.8rem)] leading-[1.22] md:leading-[1.12] tracking-normal">
            <span className="hero-title-1 block text-[var(--bone)]">
              <span className="reveal-line py-1 md:py-2"><span>طريق</span></span>
            </span>
            <span className="hero-title-2 block text-[var(--amber)] whitespace-nowrap">
              <span className="reveal-line py-1 md:py-2"><span>أوباري — غات</span></span>
            </span>
          </h1>
        </div>

        <p className="hero-sub mt-5 md:mt-8 max-w-xl px-2 text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed text-[var(--bone)]/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          ٣٦٠ كيلومتراً تعبر صحراء فزان، تربط ثانية مدن الجنوب ببوابة ليبيا الغربية على الحدود الجزائرية
        </p>
      </div>

      <div className="hero-cue absolute bottom-5 md:bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-3">
        <span className="text-[10px] md:text-xs font-medium tracking-normal text-[var(--mute)]">مرّر للأسفل</span>
        <div className="scroll-cue" />
      </div>
    </section>
  );
}
