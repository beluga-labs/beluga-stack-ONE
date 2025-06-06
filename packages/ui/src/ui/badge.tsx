import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@beluga/utils';

const badgeVariants = cva(
    'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-2 focus-visible:ring-zinc-400/50 dark:focus-visible:ring-zinc-600/50 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 transition-[color,box-shadow] overflow-hidden',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-zinc-900 text-white [a&]:hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:[a&]:hover:bg-zinc-200',
                destructive:
                    'border-transparent bg-red-500 text-white [a&]:hover:bg-red-600 focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40 dark:bg-red-500/60',
                outline:
                    'text-zinc-900 [a&]:hover:bg-zinc-100 [a&]:hover:text-zinc-900 dark:text-zinc-50 dark:[a&]:hover:bg-zinc-800 dark:[a&]:hover:text-zinc-50'
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
);

const Badge = ({
    className,
    variant,
    asChild = false,
    ...props
}: React.ComponentProps<'span'> &
    VariantProps<typeof badgeVariants> & { asChild?: boolean }) => {
    const Comp = asChild ? Slot : 'span';

    return (
        <Comp
            data-slot="badge"
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    );
};

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
