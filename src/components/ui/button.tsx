import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', fullWidth, children, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

        const variants = {
            primary: 'bg-[#111827] text-white hover:bg-black focus-visible:ring-[#111827] shadow-lg hover:shadow-xl active:scale-[0.98] rounded-full',
            secondary: 'bg-surface hover:bg-surface-hover text-foreground border border-border shadow-sm rounded-full',
            outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:scale-[0.98] rounded-full',
            ghost: 'hover:bg-surface-hover text-foreground/80 hover:text-foreground rounded-full',
        };

        const sizes = {
            sm: 'h-9 px-4 text-sm',
            md: 'h-11 px-6 text-base',
            lg: 'h-14 px-8 text-lg',
        };

        const classes = [
            baseStyles,
            variants[variant],
            sizes[size],
            fullWidth ? 'w-full' : '',
            className,
        ].filter(Boolean).join(' ');

        return (
            <button
                ref={ref}
                className={classes}
                {...props}
                suppressHydrationWarning
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
