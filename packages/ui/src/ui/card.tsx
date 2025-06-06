import * as React from 'react';

import { cn } from '@beluga/utils';
import { Paragraph } from './paragraph';
import { Slot } from '@radix-ui/react-slot';

interface CardProps extends React.ComponentProps<'div'> {
    asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'div';
        return (
            <Comp
                ref={ref as any}
                data-slot="card"
                className={cn(
                    'bg-zinc-50 dark:bg-zinc-950 flex flex-col gap-6 rounded-lg border border-zinc-200 dark:border-zinc-800',
                    'transition-colors duration-200',
                    '[&[href]]:hover:border-zinc-300 [&[href]]:dark:hover:border-zinc-700',
                    '[&[href]]:hover:bg-zinc-100 [&[href]]:dark:hover:bg-zinc-900',
                    '[&[href]]:hover:shadow-sm',
                    className
                )}
                {...props}
            />
        );
    }
);

Card.displayName = 'Card';

const CardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
    return (
        <div
            data-slot="card-header"
            className={cn(
                'w-full px-6 py-4 border-b border-zinc-200 dark:border-zinc-700',
                className
            )}
            {...props}
        />
    );
};

interface CardTitleProps extends React.ComponentProps<typeof Paragraph> {}

const CardTitle = ({ className, ...props }: CardTitleProps) => {
    return (
        <Paragraph
            data-slot="card-title"
            size="lg"
            weight="semibold"
            className={className}
            {...props}
        />
    );
};

interface CardDescriptionProps extends React.ComponentProps<typeof Paragraph> {}

const CardDescription = ({ className, ...props }: CardDescriptionProps) => {
    return (
        <Paragraph
            data-slot="card-description"
            variant="muted"
            size="xs"
            className={className}
            {...props}
        />
    );
};

const CardContent = ({ className, ...props }: React.ComponentProps<'div'>) => {
    return (
        <div
            data-slot="card-content"
            className={cn('flex-1 p-6 flex flex-col gap-4', className)}
            {...props}
        />
    );
};

const CardFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
    return (
        <div
            data-slot="card-footer"
            className={cn(
                'flex gap-2 justify-between items-center px-6 py-4 border-t border-zinc-200 dark:border-zinc-700',
                className
            )}
            {...props}
        />
    );
};

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent
};
