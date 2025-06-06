import { cn } from '@beluga/utils';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

// Types
const listVariants = cva('', {
    variants: {
        styleType: {
            disc: 'list-disc pl-4',
            decimal: 'list-decimal pl-4',
            none: 'list-none'
        },
        spacing: {
            none: 'space-y-0',
            sm: 'space-y-1',
            md: 'space-y-2',
            lg: 'space-y-4'
        }
    },
    defaultVariants: {
        styleType: 'disc',
        spacing: 'md'
    }
});

export interface ListProps
    extends React.HTMLAttributes<HTMLUListElement>,
        VariantProps<typeof listVariants> {
    /**
     * HTML element type
     * @default "ul"
     */
    type?: 'ul' | 'ol';
    /**
     * Whether to render as child component
     * @default false
     */
    asChild?: boolean;
}

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
    /**
     * Whether to render as child component
     * @default false
     */
    asChild?: boolean;
}

// Components
const List = React.forwardRef<HTMLUListElement, ListProps>(
    (
        {
            className,
            type = 'ul',
            styleType,
            spacing,
            asChild = false,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : type;

        return (
            <Comp
                className={cn(listVariants({ styleType, spacing, className }))}
                ref={ref as any}
                {...props}>
                {props.children}
            </Comp>
        );
    }
);
List.displayName = 'List';

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
    ({ className, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'li';

        return (
            <Comp
                className={cn('pl-2', className)}
                ref={ref}
                {...props}>
                {props.children}
            </Comp>
        );
    }
);
ListItem.displayName = 'ListItem';

export { List, ListItem, listVariants };
