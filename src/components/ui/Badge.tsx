import {cn} from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({children, variant = 'default', size = 'sm', className}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        {
          'bg-slate-100 text-slate-700': variant === 'default',
          'bg-blue-100 text-blue-700': variant === 'blue',
          'bg-green-100 text-green-700': variant === 'green',
          'bg-yellow-100 text-yellow-700': variant === 'yellow',
          'bg-red-100 text-red-700': variant === 'red',
          'bg-purple-100 text-purple-700': variant === 'purple',
        },
        {
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-3 py-1 text-sm': size === 'md',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
