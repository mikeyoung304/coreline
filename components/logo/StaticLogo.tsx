import { LOGO_PATHS, LOGO_VIEWBOX } from './logo-paths';
import { cn } from '@/lib/utils';

interface StaticLogoProps {
  className?: string;
}

export function StaticLogo({ className }: StaticLogoProps) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={cn('w-24 h-24', className)}
      aria-label="Coreline Partners Logo"
      role="img"
    >
      <path d={LOGO_PATHS.slateShape} fill="#3d4f5f" />
      <path d={LOGO_PATHS.blueAccent} fill="#5c7cad" />
    </svg>
  );
}
