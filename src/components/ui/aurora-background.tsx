import React from 'react';

type AuroraBackgroundProps = React.HTMLAttributes<HTMLDivElement> & {
  showRadialGradient?: boolean;
};

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Aurora background inspired by Aceternity UI.
 * Uses Tailwind v4 theme animation variable `--animate-aurora` (see `src/app/globals.css`).
 */
export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cx(
        'relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black',
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Base tint */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Aurora layer */}
        <div
          className={cx(
            'absolute inset-0 opacity-80',
            'animate-aurora',
            // Big blurred gradients that shift via background-position animation
            '[background-image:repeating-linear-gradient(100deg,rgba(0,255,255,0.28)_0%,rgba(0,255,255,0.12)_10%,rgba(0,255,136,0.22)_20%,rgba(0,132,255,0.20)_30%,rgba(255,255,255,0.06)_40%,rgba(0,255,255,0.28)_50%),repeating-linear-gradient(100deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.70)_25%,rgba(0,0,0,0.92)_50%)]',
            '[background-size:300%_200%,200%_100%]',
            '[background-position:50%_50%,50%_50%]',
            'blur-3xl saturate-150',
            showRadialGradient
              ? '[mask-image:radial-gradient(ellipse_at_50%_35%,black_35%,transparent_72%)]'
              : undefined
          )}
        />

        {/* Subtle noise-ish overlay */}
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
