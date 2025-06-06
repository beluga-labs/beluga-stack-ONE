import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@beluga/utils';

const alertVariants = cva(
    'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
    {
        variants: {
            variant: {
                default:
                    'bg-zinc-100 text-zinc-950 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-800',
                destructive:
                    'bg-red-50 text-red-700 border-red-200 [&>svg]:text-red-700 *:data-[slot=alert-description]:text-red-700/90 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800/50 dark:*:data-[slot=alert-description]:text-red-400/90',
                success:
                    'bg-green-50 text-green-700 border-green-200 [&>svg]:text-green-700 *:data-[slot=alert-description]:text-green-700/90 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800/50 dark:*:data-[slot=alert-description]:text-green-400/90',
                warning:
                    'bg-yellow-50 text-yellow-700 border-yellow-200 [&>svg]:text-yellow-700 *:data-[slot=alert-description]:text-yellow-700/90 dark:bg-yellow-950/50 dark:text-yellow-400 dark:border-yellow-800/50 dark:*:data-[slot=alert-description]:text-yellow-400/90',
                info: 'bg-blue-50 text-blue-700 border-blue-200 [&>svg]:text-blue-700 *:data-[slot=alert-description]:text-blue-700/90 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800/50 dark:*:data-[slot=alert-description]:text-blue-400/90',
                message:
                    'bg-zinc-100 text-zinc-700 border-zinc-200 [&>svg]:text-zinc-700 *:data-[slot=alert-description]:text-zinc-700/90 dark:bg-zinc-800/50 dark:text-zinc-400 dark:border-zinc-800/50 dark:*:data-[slot=alert-description]:text-zinc-400/90'
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
);

function Alert({
    className,
    variant,
    ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
    return (
        <div
            data-slot="alert"
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        />
    );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-title"
            className={cn(
                'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
                className
            )}
            {...props}
        />
    );
}

function AlertDescription({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-description"
            className={cn(
                'text-zinc-500 col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed dark:text-zinc-400',
                className
            )}
            {...props}
        />
    );
}

export { Alert, AlertTitle, AlertDescription };
