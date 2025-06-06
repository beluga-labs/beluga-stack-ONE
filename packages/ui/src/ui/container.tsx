import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@beluga/utils';

const containerVariants = cva(
    `
        container
        mx-auto
        grid
        grid-rows-auto
        grid-cols-6 md:grid-cols-12
        gap-x-8
        px-8
        justify-stretch
        content-center
    `,
    {
        variants: {
            spacing: {
                'false': '',
                'none': 'py-0',
                'xs': 'py-4',
                'sm': 'py-8',
                'base': 'py-16',
                'lg': 'py-32',
                'xl': 'py-48',
                '2xl': 'py-64',
                '3xl': 'py-80',
                '4xl': 'py-96'
            },
            spacingTop: {
                'false': '',
                'none': 'pt-0',
                'xs': 'pt-4',
                'sm': 'pt-8',
                'base': 'pt-16',
                'lg': 'pt-32',
                'xl': 'pt-48',
                '2xl': 'pt-64',
                '3xl': 'pt-80',
                '4xl': 'pt-96'
            },
            spacingBottom: {
                'false': '',
                'none': 'pb-0',
                'xs': 'pb-4',
                'sm': 'pb-8',
                'base': 'pb-16',
                'lg': 'pb-32',
                'xl': 'pb-48',
                '2xl': 'pb-64',
                '3xl': 'pb-80',
                '4xl': 'pb-96'
            },
            align: {
                start: 'items-start',
                end: 'items-end',
                center: 'items-center',
                stretch: 'items-stretch'
            },
            justify: {
                start: 'justify-items-start',
                end: 'justify-items-end',
                center: 'justify-items-center',
                between: 'justify-items-between',
                stretch: 'justify-items-stretch'
            }
        },
        defaultVariants: {
            spacingTop: 'lg',
            align: 'start',
            justify: 'center'
        }
    }
);

export interface ContainerProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof containerVariants> {
    as?: React.ElementType;
    asChild?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    (
        {
            className,
            spacing,
            spacingTop,
            spacingBottom,
            align,
            justify,
            as = 'section',
            asChild = false,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : as;

        return (
            <Comp
                className={cn(
                    containerVariants({
                        spacing,
                        spacingTop: !spacing && spacingTop,
                        spacingBottom: !spacing && spacingBottom,
                        align,
                        justify
                    }),
                    className
                )}
                ref={ref}
                {...props}>
                {props.children}
            </Comp>
        );
    }
);
Container.displayName = 'Container';

const containerContentVariants = cva('w-full min-w-0', {
    variants: {
        col: {
            false: '',
            small: 'col-span-full md:col-[4_/_span_6]',
            medium: 'col-span-full md:col-[3_/_span_8]',
            large: 'col-span-full md:col-[2_/_span_10]',
            full: 'col-span-full'
        },
        colSpan: {
            'false': '',
            'auto': 'col-span-auto',
            '1': 'col-[span_1]',
            '2': 'col-[span_2]',
            '3': 'col-[span_3]',
            '4': 'col-[span_4]',
            '5': 'col-[span_5]',
            '6': 'col-[span_6]',
            '7': 'col-[span_7]',
            '8': 'col-[span_8]',
            '9': 'col-[span_9]',
            '10': 'col-[span_10]',
            '11': 'col-[span_11]',
            '12': 'col-[span_12]',
            'full': 'col-span-full'
        },
        colStart: {
            'false': '',
            '1': 'col-start-1',
            '2': 'col-start-2',
            '3': 'col-start-3',
            '4': 'col-start-4',
            '5': 'col-start-5',
            '6': 'col-start-6',
            '7': 'col-start-7',
            '8': 'col-start-8',
            '9': 'col-start-9',
            '10': 'col-start-10',
            '11': 'col-start-11',
            '12': 'col-start-12'
        },
        colEnd: {
            'false': '',
            '1': 'col-end-1',
            '2': 'col-end-2',
            '3': 'col-end-3',
            '4': 'col-end-4',
            '5': 'col-end-5',
            '6': 'col-end-6',
            '7': 'col-end-7',
            '8': 'col-end-8',
            '9': 'col-end-9',
            '10': 'col-end-10',
            '11': 'col-end-11',
            '12': 'col-end-12'
        }
    },
    defaultVariants: {
        col: 'full'
    }
});

export interface ContainerContentProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof containerContentVariants> {
    as?: React.ElementType;
    asChild?: boolean;
}

const ContainerContent = React.forwardRef<
    HTMLDivElement,
    ContainerContentProps
>(
    (
        {
            className,
            col,
            colSpan,
            colStart,
            colEnd,
            as = 'div',
            asChild = false,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : as;

        return (
            <Comp
                className={cn(
                    containerContentVariants({
                        col,
                        colSpan: !col && colSpan,
                        colStart: !col && colStart,
                        colEnd: !col && colEnd
                    }),
                    className
                )}
                ref={ref}
                {...props}>
                {props.children}
            </Comp>
        );
    }
);
ContainerContent.displayName = 'Container Content';

export {
    Container,
    ContainerContent,
    containerContentVariants,
    containerVariants
};
