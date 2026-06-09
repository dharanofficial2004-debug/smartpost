import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', error, ...props }, ref) => {
        return (
            <div className="w-full">
                <input
                    ref={ref}
                    className={`flex h-11 w-full rounded-full border border-border bg-surface px-4 py-2 text-sm placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-sm ${error ? 'border-red-500 focus-visible:ring-red-500' : ''
                        } ${className}`}
                    {...props}
                    suppressHydrationWarning
                />
                {error && (
                    <p className="mt-1 text-sm text-red-500 pl-4">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
