import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@beluga/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap font-medium cursor-pointer border-1 border-transparent backdrop-blur-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50 dark:focus-visible:ring-zinc-600/50 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500',
    {
        variants: {
            variant: {
                primary:
                    'bg-gradient-to-t from-primary-700 to-primary-600 border-primary-400 shadow-md text-primary-50 hover:to-primary-500 dark:from-primary-600 dark:to-primary-500 dark:border-primary-400 dark:text-primary-50 dark:hover:to-primary-400',
                secondary:
                    'bg-gradient-to-t from-zinc-800 to-zinc-700 border-zinc-500 text-zinc-50 hover:to-zinc-600 dark:from-zinc-300 dark:to-zinc-200 dark:border-white dark:text-zinc-900 dark:hover:to-zinc-50',
                destructive:
                    'bg-gradient-to-t from-red-700 to-red-600 border-red-400 shadow-md text-red-50 hover:to-red-500 dark:from-red-700 dark:to-red-600 dark:border-red-500 dark:text-red-50 dark:hover:to-red-500',
                outline:
                    'bg-zinc-50 border-zinc-200 text-zinc-900 hover:bg-zinc-200 hover:border-zinc-300 dark:bg-zinc-950 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-700 dark:hover:border-zinc-600',
                ghost: 'bg-transparent border-transparent text-zinc-900 hover:bg-zinc-200 hover:border-zinc-300 dark:text-zinc-50 dark:hover:bg-zinc-700 dark:hover:border-zinc-600',
                link: 'bg-transparent text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50 border-transparent'
            },
            size: {
                '2xs': "h-8 gap-1 px-3 text-xs [&_svg:not([class*='size-'])]:size-3.5 rounded-xl",
                'xs': "h-9 gap-1.5 px-4 text-sm [&_svg:not([class*='size-'])]:size-4 rounded-xl",
                'sm': "h-10 gap-1.5 px-5 text-md [&_svg:not([class*='size-'])]:size-5 rounded-xl",
                'md': "h-11 gap-2 px-7 text-lg [&_svg:not([class*='size-'])]:size-6 rounded-2xl",
                'lg': "h-12 gap-2.5 px-8 text-xl [&_svg:not([class*='size-'])]:size-6.5 rounded-2xl",
                'icon-2xs':
                    "size-8 [&_svg:not([class*='size-'])]:size-3.5 rounded-xl",
                'icon-xs':
                    "size-9 [&_svg:not([class*='size-'])]:size-4 rounded-xl",
                'icon-sm':
                    "size-10 [&_svg:not([class*='size-'])]:size-5 rounded-xl",
                'icon-md':
                    "size-11 [&_svg:not([class*='size-'])]:size-6 rounded-2xl",
                'icon-lg':
                    "size-12 [&_svg:not([class*='size-'])]:size-6.5 rounded-2xl"
            }
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md'
        }
    }
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
};

type ButtonProps = ButtonBaseProps &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        const buttonClasses = buttonVariants({ variant, size, className });

        return (
            <Comp
                data-slot="button"
                className={cn(buttonClasses)}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
