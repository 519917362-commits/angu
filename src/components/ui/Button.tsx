import {cn} from '@/lib/utils';
import {ButtonHTMLAttributes, forwardRef} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant = 'primary', size = 'md', disabled, children, ...props}, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg',
          {
            'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600 active:bg-blue-800': variant === 'primary',
            'bg-slate-800 text-white hover:bg-slate-900 focus-visible:ring-slate-800': variant === 'secondary',
            'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 focus-visible:ring-slate-400': variant === 'outline',
            'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-400': variant === 'ghost',
            'bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-500': variant === 'whatsapp',
            'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600': variant === 'danger',
          },
          {
            'h-8 px-3 text-xs': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-12 px-6 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
