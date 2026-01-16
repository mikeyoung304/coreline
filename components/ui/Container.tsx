import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto max-w-6xl px-6', className)}>
      {children}
    </div>
  );
}
