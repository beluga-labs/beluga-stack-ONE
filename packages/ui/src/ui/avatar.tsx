'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@beluga/utils';

const avatarVariants = cva(
    'relative flex shrink-0 overflow-hidden border border-zinc-200 dark:border-zinc-700',
    {
        variants: {
            size: {
                sm: 'size-6 rounded-lg [&_span]:text-xs',
                md: 'size-8 rounded-xl [&_span]:text-sm',
                lg: 'size-12 rounded-2xl [&_span]:text-base',
                xl: 'size-16 rounded-3xl [&_span]:text-lg'
            }
        },
        defaultVariants: {
            size: 'md'
        }
    }
);

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> &
    VariantProps<typeof avatarVariants>;

const Avatar = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Root>,
    AvatarProps
>(({ className, size, ...props }, ref) => {
    return (
        <AvatarPrimitive.Root
            ref={ref}
            data-slot="avatar"
            className={cn(avatarVariants({ size, className }))}
            {...props}
        />
    );
});

Avatar.displayName = 'Avatar';

const AvatarImage = ({
    className,
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) => {
    return (
        <AvatarPrimitive.Image
            data-slot="avatar-image"
            className={cn('aspect-square size-full', className)}
            {...props}
        />
    );
};

AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = ({
    className,
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) => {
    return (
        <AvatarPrimitive.Fallback
            data-slot="avatar-fallback"
            className={cn(
                'bg-zinc-100 dark:bg-zinc-800 flex size-full items-center justify-center text-zinc-700 dark:text-zinc-200',
                className
            )}
            {...props}
        />
    );
};

AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };
