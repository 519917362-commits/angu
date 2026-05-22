import {cn} from '@/lib/utils';
import {SelectHTMLAttributes, forwardRef} from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{value: string; label: string}>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({className, label, error, id, options, ...props}, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-slate-700 mb-1.5">
            {label}
            {props.required && <span className="text-red-500 ms-0.5">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full px-3 py-2 border rounded-lg text-sm text-slate-900',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            'transition-all duration-200 appearance-none bg-white',
            'cursor-pointer',
            error
              ? 'border-red-400 bg-red-50 focus:ring-red-500'
              : 'border-slate-300 hover:border-slate-400',
            props.disabled && 'bg-slate-100 cursor-not-allowed opacity-60',
            className
          )}
          {...props}
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
