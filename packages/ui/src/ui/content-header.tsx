'use client';

import { cn } from '@beluga/utils';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { Paragraph } from './paragraph';

interface ContentHeaderProps extends React.HTMLAttributes<HTMLElement> {
    as?: React.ElementType;
    asChild?: boolean;
}

const ContentHeader = React.forwardRef<HTMLElement, ContentHeaderProps>(
    ({ className, as = 'header', asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : as;

        return (
            <Comp
                className={cn(
                    'flex justify-between items-center w-full px-8 py-4 border-b border-zinc-200 dark:border-zinc-700',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

ContentHeader.displayName = 'ContentHeader';

interface ContentHeaderTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: LucideIcon;
    title: string;
}

const ContentHeaderTitle = React.forwardRef<
    HTMLDivElement,
    ContentHeaderTitleProps
>(({ className, icon: Icon, title, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn('flex items-center gap-2', className)}
            {...props}>
            {Icon && <Icon className="size-6 shrink-0" />}
            <Paragraph
                size="lg"
                weight="semibold">
                {title}
            </Paragraph>
        </div>
    );
});

ContentHeaderTitle.displayName = 'ContentHeaderTitle';

export {
    ContentHeader,
    type ContentHeaderProps,
    ContentHeaderTitle,
    type ContentHeaderTitleProps
};
