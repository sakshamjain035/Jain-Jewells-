import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "h-7",
    md: "h-9",
    lg: "h-12",
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* House emblem — a fine gold seal */}
      <svg
        className={`${sizeClasses[size]} w-auto text-[#c9a96a] shrink-0`}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="30" stroke="url(#goldGrad)" strokeWidth="0.8" opacity="0.55" />
        <circle cx="32" cy="32" r="26" stroke="url(#goldGrad)" strokeWidth="0.5" opacity="0.35" />
        <path
          d="M32 12L36.6 22.5L48 24.6L39.6 32.2L41.8 43.2L32 37.8L22.2 43.2L24.4 32.2L16 24.6L27.4 22.5L32 12Z"
          fill="url(#goldGrad)"
        />
        <path
          d="M32 20L34.6 26.2L41.5 27L36.4 31.7L37.8 38.4L32 35.2L26.2 38.4L27.6 31.7L22.5 27L29.4 26.2L32 20Z"
          fill="#0a0a08"
          stroke="url(#goldGrad)"
          strokeWidth="0.9"
        />
        <circle cx="32" cy="29.5" r="2" fill="#f4eee3" />
        <defs>
          <linearGradient id="goldGrad" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e8d9b4" />
            <stop offset="45%" stopColor="#c9a96a" />
            <stop offset="100%" stopColor="#9c7f4c" />
          </linearGradient>
        </defs>
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span className="font-serif-luxury text-[1.35rem] sm:text-[1.5rem] text-[#f4eee3] tracking-[0.16em] uppercase leading-none">
          Jain Jewells
        </span>
        <span className="text-[7.5px] sm:text-[8px] tracking-[0.42em] text-[#a79e8e] uppercase mt-1.5 font-normal">
          Jaipur · Est. 1984
        </span>
      </div>
    </div>
  );
};
