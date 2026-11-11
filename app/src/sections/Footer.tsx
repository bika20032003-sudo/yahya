import { assetUrl } from '@/lib/utils';

export default function Footer() {
  return (
    <footer id="footer" className="relative border-t border-[var(--bone)]/10 bg-[var(--ink)] px-6 py-14 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={assetUrl('images/logo.webp')}
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.endsWith('.png')) {
                target.src = assetUrl('images/logo.png');
              }
            }}
            alt="شعار الجهاز"
            width="64"
            height="64"
            loading="lazy"
            decoding="async"
            className="h-16 w-16 object-contain"
          />
          <div>
            <p className="font-display text-lg text-[var(--bone)]">جهاز تنفيذ مشروعات المواصلات</p>
            <p className="text-xs font-light text-[var(--mute)]">إدارة مشروعات الطرق الرئيسية — ليبيا</p>
          </div>
        </div>

        {/* زر العودة للبوابة الإخبارية */}
        <div className="flex flex-col items-center gap-2 md:items-end">
          <a
            href="https://bika20032003-sudo.github.io/ubari.com/"
            className="group inline-flex items-center gap-3 rounded-full border border-[var(--amber)]/45 bg-[var(--amber)]/10 px-6 py-2.5 text-xs sm:text-sm font-semibold text-[var(--amber)] transition-all duration-300 hover:border-[var(--amber)] hover:bg-[var(--amber)] hover:text-[#0a0a0b] hover:shadow-[0_0_24px_rgba(232,147,44,0.35)] active:scale-95"
          >
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>العودة للبوابة الإخبارية</span>
          </a>
          <span className="text-[10px] text-[var(--mute)]">البوابة الرسمية لمتابعة مشاريع وأخبار بلدية أوباري</span>
        </div>

        <div className="text-center md:text-left">
          <p className="text-xs font-light leading-relaxed text-[var(--mute)]">
            مشروع صيانة وتطوير طريق أوباري – غات
            <br />
            ضمن خطة «عودة الحياة» — حكومة الوحدة الوطنية
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-[var(--bone)]/10 pt-6 text-center md:flex-row">
        <p className="text-xs font-light text-[var(--mute)]">
          جميع الحقوق محفوظة © 2026 — جهاز تنفيذ مشروعات المواصلات | حكومة الوحدة الوطنية
        </p>
        <p className="num-latin text-[11px] text-[var(--mute)]/80">
          دولة ليبيا
        </p>
      </div>
    </footer>
  );
}
