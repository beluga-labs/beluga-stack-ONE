import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@beluga/utils';

const buttonVariants = cva(
    'inline-flex items-center gap-4 whitespace-nowrap rounded font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-gray-300',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-gray-700 hover:bg-primary-dark disabled:bg-gray-400',
                defaultLight:
                    'bg-white text-primary hover:bg-primary-light hover:text-primary-dark disabled:text-gray-400',
                outline:
                    'bg-transparent text-primary border border-primary hover:text-primary-dark hover:border-primary-dark disabled:text-gray-400 disabled:border-gray-400',
                outlineLight:
                    'bg-transparent text-gray-700 border border-white hover:text-primary-light hover:border-primary-light disabled:text-gray-400 disabled:border-gray-400',
                select: 'bg-transparent !text-gray-500 border border-gray-400 !rounded-none !pr-3 font-normal hover:border-primary-dark disabled:text-gray-400 disabled:border-gray-400 [&_svg]:text-primary',
                link: 'text-primary hover:text-primary-dark',
                linkLight: 'text-gray-700 hover:text-gray-400',
                ghost: 'bg-transparent text-gray-400 hover:text-gray-500 hover:bg-gray-300 disabled:opacity-50'
            },
            size: {
                sm: 'h-9 px-6 text-sm',
                default: 'h-12 px-6 text-base',
                lg: 'h-14 px-6 text-base',
                link: 'h-auto gap-2 text-base'
            },
            align: {
                center: 'justify-center',
                between: 'justify-between',
                left: 'justify-left',
                right: 'justify-right'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            align: 'center'
        }
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
