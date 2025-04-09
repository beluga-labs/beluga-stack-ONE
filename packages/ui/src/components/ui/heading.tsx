import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@beluga/utils';

const headingVariants = cva('w-full text-zinc-900 dark:text-zinc-50', {
    variants: {
        size: {
            '4xs': 'text-xs leading-tight',
            '3xs': 'text-sm leading-tight',
            '2xs': 'text-base leading-tight',
            'xs': 'text-lg leading-tight',
            'sm': 'text-xl leading-tight',
            'base': 'text-xl md:text-2xl leading-tight',
            'lg': 'text-2xl md:text-3xl leading-tight',
            'xl': 'text-2xl md:text-3xl xl:text-4xl leading-tight',
            '2xl': 'text-3xl md:text-4xl xl:text-5xl leading-tight',
            '3xl': 'text-4xl md:text-5xl xl:text-6xl leading-tight',
            '4xl': 'text-5xl md:text-6xl xl:text-7xl leading-tight',
            '5xl': 'text-6xl md:text-7xl xl:text-8xl leading-tight',
            '6xl': 'text-7xl md:text-8xl xl:text-9xl leading-tight'
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
            mono: 'font-mono'
        }
    },
    defaultVariants: {
        size: 'lg',
        align: 'left',
        weight: 'normal',
        font: 'sans'
    }
});

export interface HeadingProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof headingVariants> {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    asChild?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    (
        {
            className,
            size,
            align,
            weight,
            font,
            level,
            asChild = false,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : `h${level}`;

        return (
            <Comp
                className={cn(
                    headingVariants({ size, align, weight, font }),
                    className
                )}
                ref={ref}
                {...props}>
                {props.children}
            </Comp>
        );
    }
);
Heading.displayName = 'Heading';

export { Heading, headingVariants };
