/** Symmetrical vine / filigree ornaments inspired by traditional scrollwork */

export function CreeperDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-10 w-full text-ab-gold ${className}`}
      viewBox="0 0 480 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.85"
        d="M0 22c40-18 80-18 120 0s80 18 120 0 80-18 120 0 80 18 120 0"
      />
      <path
        stroke="#800000"
        strokeWidth="0.45"
        opacity="0.45"
        d="M12 26c32-10 64-10 96 0s64 10 96 0 64-10 96 0 64 10 96 0 64-10 96 0"
      />
      <path
        fill="currentColor"
        opacity="0.35"
        d="M232 8c3 0 6 2 8 5-4-1-8-2-12-2-4 0-8 1-12 2 2-3 5-5 8-5h8c4 0 8-1 12-2-2 3-5 5-8 5h-8zm8 0z"
      />
      <path
        stroke="currentColor"
        strokeWidth="0.5"
        d="M140 18c8-6 16-6 24 0m152 0c8-6 16-6 24 0M64 24c6-4 12-4 18 0m316 0c6-4 12-4 18 0"
      />
    </svg>
  );
}

export function CreeperCorners({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g opacity="0.55">
        <path
          d="M6 10 C 10 6, 16 6, 20 10 C 16 14, 10 14, 6 10 Z"
          fill="currentColor"
          opacity="0.12"
        />
        <path
          d="M94 10 C 90 6, 84 6, 80 10 C 84 14, 90 14, 94 10 Z"
          fill="currentColor"
          opacity="0.12"
        />
        <path
          d="M6 90 C 10 94, 16 94, 20 90 C 16 86, 10 86, 6 90 Z"
          fill="currentColor"
          opacity="0.12"
        />
        <path
          d="M94 90 C 90 94, 84 94, 80 90 C 84 86, 90 86, 94 90 Z"
          fill="currentColor"
          opacity="0.12"
        />
      </g>

      <g fill="none" stroke="currentColor" opacity="0.35" strokeWidth="0.45">
        <path d="M5 18 C 14 6, 24 6, 33 18" />
        <path d="M67 18 C 76 6, 86 6, 95 18" />
        <path d="M5 82 C 14 94, 24 94, 33 82" />
        <path d="M67 82 C 76 94, 86 94, 95 82" />
      </g>

      <g fill="none" stroke="#800000" opacity="0.18" strokeWidth="0.35">
        <path d="M6 22 C 16 10, 22 10, 32 22" />
        <path d="M68 22 C 78 10, 84 10, 94 22" />
        <path d="M6 78 C 16 90, 22 90, 32 78" />
        <path d="M68 78 C 78 90, 84 90, 94 78" />
      </g>
    </svg>
  );
}

export function CreeperUnderlay({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden
    >
      <svg className="absolute -left-[20%] top-0 h-[120%] w-[140%] text-ab-gold/[0.07]" viewBox="0 0 800 800">
        <defs>
          <pattern id="creep" width="120" height="120" patternUnits="userSpaceOnUse">
            <path
              fill="currentColor"
              d="M10 60 Q30 40 50 60 T90 60 Q70 80 50 60 T10 60 M60 10 Q80 30 60 50 T60 90 Q40 70 60 50 T60 10"
            />
            <circle cx="60" cy="60" r="1.2" fill="currentColor" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#creep)" />
      </svg>
      <svg
        className="absolute -right-[10%] bottom-0 h-[90%] w-[80%] rotate-12 text-ab-brand/[0.06]"
        viewBox="0 0 600 600"
      >
        <defs>
          <pattern id="creep2" width="90" height="90" patternUnits="userSpaceOnUse">
            <path
              stroke="currentColor"
              fill="none"
              strokeWidth="0.4"
              d="M0 45 Q22 22 45 45 T90 45 M45 0 Q68 22 45 45 T45 90"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#creep2)" />
      </svg>
    </div>
  );
}
