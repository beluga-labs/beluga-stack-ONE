'use client';

import { cn } from '@beluga/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const contentGroupVariants = cva('flex flex-col', {
    variants: {
        variant: {
            main: 'gap-12 p-8',
            default: 'gap-8',
            sub: 'gap-4'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});

export interface ContentGroupProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof contentGroupVariants> {
    as?: React.ElementType;
    asChild?: boolean;
}

const ContentGroup = React.forwardRef<HTMLDivElement, ContentGroupProps>(
    ({ className, variant, as = 'div', asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : as;

        return (
            <Comp
                className={cn(contentGroupVariants({ variant, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);

ContentGroup.displayName = 'ContentGroup';

export { ContentGroup, contentGroupVariants };
