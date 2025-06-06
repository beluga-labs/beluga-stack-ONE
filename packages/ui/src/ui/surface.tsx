import { Slot } from '@radix-ui/react-slot';
import { cn } from '@beluga/utils';
import React from 'react';
import { ReactNode } from 'react';

interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    dataSlot?: string;
    className?: string;
    elevation?: 'high' | 'medium' | 'low';
    as?: React.ElementType;
    asChild?: boolean;
}

const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
    (
        {
            children,
            dataSlot = 'surface',
            className,
            elevation = 'medium',
            as = 'div',
            asChild = false,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : as;

        return (
            <Comp
                ref={ref}
                data-slot={dataSlot}
                className={cn(
                    'bg-zinc-50 border-2 border-white/80 backdrop-blur-sm dark:bg-zinc-950/80 dark:border-zinc-800',
                    elevation === 'high' && 'shadow-lg',
                    elevation === 'medium' && 'shadow-md',
                    elevation === 'low' && 'shadow-sm',
                    className
                )}
                {...props}>
                {children}
            </Comp>
        );
    }
);

Surface.displayName = 'Surface';

export { Surface, type SurfaceProps };
