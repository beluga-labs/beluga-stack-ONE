import { VariantProps } from 'class-variance-authority';
import React from 'react';
import { Paragraph, paragraphVariants } from './paragraph';
import { cn } from '@beluga/utils';

// Types
export interface DefinitionListProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Spacing between items
     * @default "3"
     */
    spacing?: '2' | '3' | '4' | '6';
}

export interface DefinitionListItemProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof paragraphVariants> {
    /**
     * Label text for the item
     */
    label: string;
    /**
     * Additional className for the content wrapper
     */
    classNameContent?: string;
    /**
     * Whether to show a border between items
     * @default true
     */
    showBorder?: boolean;
}

// Components
const DefinitionList = React.forwardRef<HTMLDivElement, DefinitionListProps>(
    ({ className, spacing = '3', ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'w-full flex flex-col',
                    `gap-${spacing}`,
                    className
                )}
                {...props}
            />
        );
    }
);
DefinitionList.displayName = 'DefinitionList';

const DefinitionListItem = React.forwardRef<
    HTMLDivElement,
    DefinitionListItemProps
>(
    (
        {
            className,
            label,
            children,
            classNameContent,
            size = 'xs',
            font = 'sans',
            align = 'left',
            showBorder = true,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    `
                    grid sm:grid-cols-[1fr_2fr] gap-2 sm:gap-8
                    pb-3
                    `,
                    showBorder &&
                        `
                    border-b
                    border-zinc-200 dark:border-zinc-800
                    last:border-0
                    `,
                    className
                )}
                {...props}>
                <Paragraph
                    size={size}
                    font={font}
                    align={align}
                    className="font-semibold">
                    {label}
                </Paragraph>
                <Paragraph
                    size={size}
                    font={font}
                    align={align}
                    className={cn(
                        'flex flex-wrap items-center',
                        classNameContent
                    )}>
                    {children}
                </Paragraph>
            </div>
        );
    }
);
DefinitionListItem.displayName = 'DefinitionListItem';

export { DefinitionList, DefinitionListItem };
