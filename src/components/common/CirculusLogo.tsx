import React from "react";

interface CirculusLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  variant?: "icon-only" | "horizontal" | "stacked";
  showTagline?: boolean;
  className?: string;
  glow?: boolean;
}

export const CirculusLogoIcon: React.FC<{ size?: number; className?: string; glow?: boolean }> = ({
  size = 36,
  className = "",
  glow = true,
}) => {
  const filterId = React.useId();
  const gradCyanPurple = `grad-cp-${filterId}`;
  const gradBlueTeal = `grad-bt-${filterId}`;
  const gradInner = `grad-in-${filterId}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${glow ? "drop-shadow-[0_0_12px_rgba(56,189,248,0.45)]" : ""} ${className}`}
      aria-label="CIRCULUS Official Logo Mark"
    >
      <defs>
        {/* Main Neon Cyan to Electric Purple Gradient */}
        <linearGradient id={gradCyanPurple} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="35%" stopColor="#00F0FF" />
          <stop offset="70%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        {/* Outer Glow Cyan/Blue Gradient */}
        <linearGradient id={gradBlueTeal} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#818CF8" stopOpacity="0.9" />
        </linearGradient>

        {/* Inner Swirl Gradient */}
        <linearGradient id={gradInner} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>

        {/* Subtle Neon Glow Filter */}
        <filter id={`glow-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Dark Ambient Circle Backdrop */}
      <circle cx="50" cy="50" r="48" fill="#070C12" fillOpacity="0.75" />
      <circle cx="50" cy="50" r="47" stroke={`url(#${gradBlueTeal})`} strokeWidth="0.75" strokeOpacity="0.3" />

      {/* Outer Vortex Swirl Bands forming the 'C' Ring structure */}
      <g filter={glow ? `url(#glow-${filterId})` : undefined}>
        {/* Main Outer C Arc Ribbon */}
        <path
          d="M 50 10 
             A 40 40 0 1 0 85 68 
             L 76 63 
             A 30 30 0 1 1 50 20 
             L 50 10 Z"
          fill={`url(#${gradCyanPurple})`}
          fillOpacity="0.95"
        />

        {/* Right C Opening Bar Elements */}
        <path
          d="M 68 44 
             L 88 44 
             C 89.5 44 90 45 90 46.5 
             L 90 53.5 
             C 90 55 89.5 56 88 56 
             L 68 56 
             Z"
          fill={`url(#${gradCyanPurple})`}
        />

        {/* Swirling Interlaced Blade 1 (Top-Left to Center) */}
        <path
          d="M 50 12 
             C 32 12, 16 26, 14 44 
             C 24 36, 36 34, 48 38 
             C 42 32, 46 22, 50 12 Z"
          fill={`url(#${gradBlueTeal})`}
          fillOpacity="0.85"
        />

        {/* Swirling Interlaced Blade 2 (Bottom-Left spiral) */}
        <path
          d="M 14 44 
             C 12 62, 24 80, 42 86 
             C 36 74, 38 60, 46 50 
             C 34 50, 22 48, 14 44 Z"
          fill={`url(#${gradCyanPurple})`}
          fillOpacity="0.9"
        />

        {/* Swirling Interlaced Blade 3 (Bottom-Right loop) */}
        <path
          d="M 42 86 
             C 60 88, 78 78, 84 62 
             C 72 68, 58 66, 50 56 
             C 50 68, 48 78, 42 86 Z"
          fill={`url(#${gradCyanPurple})`}
          fillOpacity="0.9"
        />

        {/* Swirling Interlaced Blade 4 (Center Vortex Arc) */}
        <path
          d="M 48 38 
             C 58 40, 64 48, 62 58 
             C 56 50, 48 50, 42 54 
             C 44 46, 44 42, 48 38 Z"
          fill={`url(#${gradInner})`}
          fillOpacity="0.95"
        />

        {/* Inner Highlighting Rim Lines for 3D Layered Tube Effect */}
        <path
          d="M 50 14 A 36 36 0 1 0 82 64"
          stroke="#A5F3FC"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="12 4 4 4"
          strokeOpacity="0.8"
        />
        <path
          d="M 22 48 C 26 68 44 80 64 78"
          stroke="#C084FC"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <path
          d="M 38 32 C 48 32 62 40 64 54"
          stroke="#E0F2FE"
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity="0.9"
        />

        {/* Center Void / Vortex Core Dot */}
        <circle cx="50" cy="50" r="4.5" fill="#050B14" stroke={`url(#${gradCyanPurple})`} strokeWidth="1.5" />
      </g>
    </svg>
  );
};

export const CirculusLogo: React.FC<CirculusLogoProps> = ({
  size = "md",
  variant = "horizontal",
  showTagline = true,
  className = "",
  glow = true,
}) => {
  const pixelSize = typeof size === "number" ? size : {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 72,
  }[size];

  if (variant === "icon-only") {
    return <CirculusLogoIcon size={pixelSize} className={className} glow={glow} />;
  }

  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center text-center gap-3 ${className}`}>
        <CirculusLogoIcon size={pixelSize} glow={glow} />
        <div className="flex flex-col items-center">
          <span 
            className="font-extrabold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#A5F3FC] via-[#38BDF8] to-[#818CF8] font-display drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
            style={{ fontSize: Math.max(18, pixelSize * 0.45) }}
          >
            CIRCULUS
          </span>
          {showTagline && (
            <span className="text-[10px] tracking-[0.22em] text-slate-300 uppercase font-medium mt-1 font-mono">
              ENDLESS NETWORKS | SUSTAINABLE FUTURES
            </span>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <CirculusLogoIcon size={pixelSize} glow={glow} />
      <div className="flex flex-col justify-center">
        <span 
          className="font-extrabold tracking-[0.16em] leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#A5F3FC] via-[#38BDF8] to-[#818CF8] font-display drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]"
          style={{ fontSize: Math.max(16, pixelSize * 0.48) }}
        >
          CIRCULUS
        </span>
        {showTagline && (
          <span className="text-[9px] tracking-[0.18em] text-slate-400 uppercase font-medium mt-1 font-mono leading-none">
            ENDLESS NETWORKS | SUSTAINABLE FUTURES
          </span>
        )}
      </div>
    </div>
  );
};
