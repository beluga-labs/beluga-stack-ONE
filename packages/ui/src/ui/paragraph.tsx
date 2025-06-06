import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@beluga/utils';

const paragraphVariants = cva('w-full leading-tight', {
    variants: {
        size: {
            '3xs': 'text-2xs',
            '2xs': 'text-xs',
            'xs': 'text-sm',
            'sm': 'text-base',
            'md': 'text-base md:lg',
            'lg': 'text-lg md:text-xl',
            'xl': 'text-lg md:text-xl xl:text-2xl',
            '2xl': 'text-xl md:text-2xl xl:text-3xl',
            '3xl': 'text-2xl md:text-3xl xl:text-4xl',
            '4xl': 'text-3xl md:text-4xl xl:text-5xl',
            '5xl': 'text-4xl md:text-5xl xl:text-6xl',
            '6xl': 'text-5xl md:text-6xl xl:text-7xl'
        },
        align: {
            left: 'text-left',
            center: 'text-center',
            right: 'text-right',
            justify: 'text-justify'
        },
        weight: {
            light: 'font-light',
            normal: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold'
        },
        font: {
            sans: 'font-sans',
            serif: 'font-serif',
            display: 'font-display',
            mono: 'font-mono'
        },
        variant: {
            default: 'text-zinc-900 dark:text-zinc-50',
            primary: 'text-primary-600 dark:text-primary-500',
            muted: 'text-zinc-500 dark:text-zinc-400'
        }
    },
    defaultVariants: {
        size: 'md',
        align: 'left',
        weight: 'normal',
        font: 'sans',
        variant: 'default'
    }
});

export interface ParagraphProps
    extends React.HTMLAttributes<HTMLParagraphElement>,
        VariantProps<typeof paragraphVariants> {
    asChild?: boolean;
}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
    (
        {
            className,
            size,
            align,
            weight,
            font,
            variant,
            asChild = false,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'p';

        return (
            <Comp
                className={cn(
                    paragraphVariants({ size, align, weight, font, variant }),
                    className
                )}
                ref={ref}
                {...props}>
                {props.children}
            </Comp>
        );
    }
);

Paragraph.displayName = 'Paragraph';

export { Paragraph, paragraphVariants };
