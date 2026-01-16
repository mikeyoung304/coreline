import { cn } from '@/lib/utils';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'default' | 'ghost' | 'premium';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: cn(
    'bg-navy-950 text-white',
    'hover:bg-navy-800'
  ),
  ghost: cn(
    'bg-transparent border border-white/20 text-white',
    'hover:border-white/40 hover:bg-white/[0.03]'
  ),
  premium: cn(
    'bg-transparent border border-navy-950/15 text-navy-950',
    'hover:bg-navy-950/[0.03] hover:border-navy-950/30'
  ),
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, asChild, variant = 'default', ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center',
      'px-10 py-4 text-xs font-medium tracking-[0.15em] uppercase',
      'rounded-none',
      'transition-all duration-500 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-950/20 focus-visible:ring-offset-2',
      variantClasses[variant],
      className
    );

    if (asChild) {
      return <>{children}</>;
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Helper component for links styled as buttons
interface ButtonLinkProps extends ComponentPropsWithoutRef<'a'> {
  variant?: ButtonVariant;
}

export function ButtonLink({ className, children, variant = 'default', ...props }: ButtonLinkProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center',
        'px-10 py-4 text-xs font-medium tracking-[0.15em] uppercase',
        'rounded-none',
        'transition-all duration-500 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-950/20 focus-visible:ring-offset-2',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

// Premium underline link - for high-end CTAs
interface UnderlineLinkProps extends ComponentPropsWithoutRef<'a'> {}

export function UnderlineLink({ className, children, ...props }: UnderlineLinkProps) {
  return (
    <a
      className={cn(
        'text-sm font-medium tracking-[0.15em] uppercase',
        'text-navy-950/60 hover:text-navy-950',
        'border-b border-navy-950/20 hover:border-navy-950/50',
        'pb-1 transition-all duration-500',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
