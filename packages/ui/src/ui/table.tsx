'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@beluga/utils';

interface TableProps extends React.ComponentProps<'table'> {
    inContainer?: boolean;
    density?: VariantProps<typeof tableVariants>['density'];
}

const tableVariants = cva('w-full caption-bottom text-sm', {
    variants: {
        density: {
            compact: '[&_td]:py-1 [&_th]:py-1',
            default: '[&_td]:py-2 [&_th]:py-2',
            spacious: '[&_td]:py-4 [&_th]:py-4'
        }
    },
    defaultVariants: {
        density: 'default'
    }
});

function Table({
    className,
    inContainer = false,
    density,
    ...props
}: TableProps) {
    return (
        <div
            data-slot="table-container"
            className={cn(
                'relative w-full overflow-x-auto',
                !inContainer &&
                    'rounded-lg border border-zinc-200 dark:border-zinc-700'
            )}>
            <table
                data-slot="table"
                className={cn(
                    tableVariants({ density }),
                    !inContainer && 'bg-zinc-50 dark:bg-zinc-950',
                    className
                )}
                {...props}
            />
        </div>
    );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
    return (
        <thead
            data-slot="table-header"
            className={cn(
                '[&_tr]:border-b border-zinc-200 dark:border-zinc-700',
                'bg-zinc-100/50 dark:bg-zinc-900/50',
                'first:rounded-t-lg [&_tr:first-child_th:first-child]:rounded-tl-lg [&_tr:first-child_th:last-child]:rounded-tr-lg',
                className
            )}
            {...props}
        />
    );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
    return (
        <tbody
            data-slot="table-body"
            className={cn('[&_tr:last-child]:border-0', className)}
            {...props}
        />
    );
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
    return (
        <tfoot
            data-slot="table-footer"
            className={cn(
                'bg-zinc-100/50 dark:bg-zinc-900/50',
                'border-t border-zinc-200 dark:border-zinc-700',
                'font-medium [&>tr]:last:border-b-0',
                'last:rounded-b-lg [&_tr:last-child_th:first-child]:rounded-bl-lg [&_tr:last-child_th:last-child]:rounded-br-lg',
                className
            )}
            {...props}
        />
    );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
    return (
        <tr
            data-slot="table-row"
            className={cn(
                'border-b border-zinc-200 dark:border-zinc-700 transition-colors',
                'hover:bg-zinc-100 dark:hover:bg-zinc-800/50',
                'data-[state=selected]:bg-primary-100 dark:data-[state=selected]:bg-primary-900/50',
                '[thead_&]:hover:bg-transparent [tfoot_&]:hover:bg-transparent',
                className
            )}
            {...props}
        />
    );
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
    return (
        <th
            data-slot="table-head"
            className={cn(
                'text-zinc-950 dark:text-zinc-50 h-10 px-2 text-left align-middle font-medium whitespace-nowrap',
                '[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
                className
            )}
            {...props}
        />
    );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
    return (
        <td
            data-slot="table-cell"
            className={cn(
                'p-2 align-middle whitespace-nowrap',
                '[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
                className
            )}
            {...props}
        />
    );
}

function TableCaption({
    className,
    ...props
}: React.ComponentProps<'caption'>) {
    return (
        <caption
            data-slot="table-caption"
            className={cn(
                'text-zinc-500 dark:text-zinc-400 mt-4 text-sm',
                className
            )}
            {...props}
        />
    );
}

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption
};
