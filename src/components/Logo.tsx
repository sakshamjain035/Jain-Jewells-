import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-11",
    lg: "h-16",
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Royal Crest Emblem */}
      <svg
        className={`${sizeClasses[size]} w-auto text-[#d4af37] shrink-0 transition-transform duration-300 hover:scale-105`}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 4L38.5 18.5L54 22L42.5 32.5L46 48L32 40L18 48L21.5 32.5L10 22L25.5 18.5L32 4Z"
          fill="url(#goldGrad)"
          stroke="#b8860b"
          strokeWidth="1.5"
        />
        <path
          d="M32 14L35.5 22L44 24L37.5 30L39.5 38.5L32 34L24.5 38.5L26.5 30L20 24L28.5 22L32 14Z"
          fill="#06110c"
          stroke="url(#goldGrad)"
          strokeWidth="1.2"
        />
        <circle cx="32" cy="26" r="3" fill="#fcf6ba" />
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#bf953f" />
            <stop offset="25%" stopColor="#fcf6ba" />
            <stop offset="50%" stopColor="#b38728" />
            <stop offset="75%" stopColor="#fbf5b7" />
            <stop offset="100%" stopColor="#aa771c" />
          </linearGradient>
        </defs>
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-[0.18em] uppercase gold-text-gradient leading-tight">
          Jain Jewells
        </span>
        <span className="text-[9px] sm:text-[10px] tracking-[0.35em] text-[#d4af37]/80 uppercase font-medium">
          Jaipur • Est. 1984
        </span>
      </div>
    </div>
  );
};
