'use client';

import { cn } from '@beluga/utils';
import {
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getPaginationRowModel,
    useReactTable,
    type ColumnDef,
    type Row,
    type HeaderGroup,
    type Cell,
    type Header,
    type Column
} from '@tanstack/react-table';
import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import {
    ChevronFirst,
    ChevronLast,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { Button } from './button';
import { Heading } from './heading';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from './select';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from './table';
import { useTranslation } from 'beluga-i18n';

export interface DataviewContainerProps
    extends React.HTMLAttributes<HTMLDivElement> {}

const DataviewContainer = React.forwardRef<
    HTMLDivElement,
    DataviewContainerProps
>(({ className, children, ...props }, ref) => {
    return (
        <div
            className={cn('flex flex-col gap-4', className)}
            ref={ref}
            {...props}>
            {children}
        </div>
    );
});
DataviewContainer.displayName = 'DataviewContainer';

export interface DataviewHeaderProps
    extends React.HTMLAttributes<HTMLDivElement> {
    heading: string | React.ReactNode;
    headingProps?: Partial<
        Omit<React.ComponentProps<typeof Heading>, 'children'>
    > & {
        level?: 1 | 2 | 3 | 4 | 5 | 6;
    };
    actions?: React.ReactNode | React.ReactNode[];
}

const DataviewHeader = React.forwardRef<HTMLDivElement, DataviewHeaderProps>(
    (
        { className, children, heading, headingProps, actions, ...props },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'flex justify-between items-center gap-4',
                    className
                )}
                {...props}>
                <Heading
                    level={headingProps?.level ?? 3}
                    size={headingProps?.size ?? '2xs'}
                    font={headingProps?.font ?? 'sans'}
                    className={cn(headingProps?.className)}
                    {...headingProps}>
                    {heading}
                </Heading>
                {actions && (
                    <div className="flex flex-wrap items-center justify-end gap-2">
                        {actions}
                    </div>
                )}
            </div>
        );
    }
);
DataviewHeader.displayName = 'DataviewHeader';

const dataviewVariants = cva('w-full', {
    variants: {
        view: {
            grid2: '@container grid grid-cols-1 @sm:grid-cols-2 gap-4',
            grid3: '@container grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 gap-4',
            grid4: '@container grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-4',
            list: 'flex flex-col gap-2',
            table: 'flex flex-col gap-2'
        }
    },
    defaultVariants: {
        view: 'grid3'
    }
});

export interface DataviewProps<TData>
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof dataviewVariants> {
    children?: React.ReactNode[];
    columns?: (ColumnDef<TData> & { isPinned?: 'left' | 'right' })[];
    pagination?: {
        pageIndex?: number;
        pageSize?: number;
        availablePageSizes?: number[];
        showPagination?: boolean;
    };
    data?: TData[];
    density?: 'compact' | 'default' | 'spacious';
}

interface ExtendedColumn<TData> extends Column<TData, unknown> {
    columnDef: ColumnDef<TData> & { isPinned?: 'left' | 'right' };
}

interface ExtendedHeader<TData> extends Header<TData, unknown> {
    column: ExtendedColumn<TData>;
}

interface ExtendedCell<TData> extends Cell<TData, unknown> {
    column: ExtendedColumn<TData>;
}

const Dataview = React.forwardRef<HTMLDivElement, DataviewProps<any>>(
    (
        {
            className,
            children,
            view,
            columns,
            pagination,
            data,
            density = 'default',
            ...props
        },
        ref
    ) => {
        const { t } = useTranslation();
        const table = useReactTable({
            data: data ?? [],
            columns: columns ?? [],
            getSubRows: (row: any) => row.items,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            getExpandedRowModel: getExpandedRowModel(),
            enableColumnPinning: true,
            defaultColumn: {
                size: 200,
                minSize: 200,
                maxSize: 800
            },
            initialState: {
                pagination: {
                    pageIndex: pagination?.pageIndex ?? 0,
                    pageSize: pagination?.pageSize ?? 10
                }
            }
        });

        const availablePageSizes = pagination?.availablePageSizes ?? [
            10, 25, 50, 75, 100
        ];

        return (
            <div
                className={cn(dataviewVariants({ view: view }), className)}
                ref={ref}
                {...props}>
                {view == 'table' && (
                    <>
                        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700">
                            <Table
                                inContainer
                                density={density}>
                                <TableHeader>
                                    {table
                                        .getHeaderGroups()
                                        .map(
                                            (headerGroup: HeaderGroup<any>) => (
                                                <TableRow key={headerGroup.id}>
                                                    {headerGroup.headers.map(
                                                        (
                                                            header: ExtendedHeader<any>
                                                        ) => {
                                                            return (
                                                                <TableHead
                                                                    key={
                                                                        header.id
                                                                    }
                                                                    className={cn(
                                                                        header
                                                                            .column
                                                                            .columnDef
                                                                            .isPinned ==
                                                                            'left' &&
                                                                            "sticky left-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm z-10 after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-zinc-200 dark:after:bg-zinc-800",
                                                                        header
                                                                            .column
                                                                            .columnDef
                                                                            .isPinned ==
                                                                            'right' &&
                                                                            "sticky right-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm z-10 after:content-[''] after:absolute after:top-0 after:left-0 after:h-full after:w-px after:bg-zinc-200 dark:after:bg-zinc-800"
                                                                    )}
                                                                    style={{
                                                                        width: `${header.getSize()}px !important`
                                                                    }}>
                                                                    {header.isPlaceholder
                                                                        ? null
                                                                        : flexRender(
                                                                              header
                                                                                  .column
                                                                                  .columnDef
                                                                                  .header,
                                                                              header.getContext()
                                                                          )}
                                                                </TableHead>
                                                            );
                                                        }
                                                    )}
                                                </TableRow>
                                            )
                                        )}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table
                                            .getRowModel()
                                            .rows.map((row: Row<any>) => (
                                                <TableRow
                                                    key={row.id}
                                                    data-state={
                                                        row.getIsSelected() &&
                                                        'selected'
                                                    }>
                                                    {row
                                                        .getVisibleCells()
                                                        .map(
                                                            (
                                                                cell: ExtendedCell<any>
                                                            ) => {
                                                                return (
                                                                    <TableCell
                                                                        key={
                                                                            cell.id
                                                                        }
                                                                        className={cn(
                                                                            cell
                                                                                .column
                                                                                .columnDef
                                                                                .isPinned ==
                                                                                'left' &&
                                                                                "sticky left-0 drop-shadow-lg bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm z-10 after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-zinc-200 dark:after:bg-zinc-800",
                                                                            cell
                                                                                .column
                                                                                .columnDef
                                                                                .isPinned ==
                                                                                'right' &&
                                                                                "sticky right-0 drop-shadow-lg bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm z-10 after:content-[''] after:absolute after:top-0 after:left-0 after:h-full after:w-px after:bg-zinc-200 dark:after:bg-zinc-800"
                                                                        )}
                                                                        style={{
                                                                            width: `${cell.column.getSize()}px !important`
                                                                        }}>
                                                                        {flexRender(
                                                                            cell
                                                                                .column
                                                                                .columnDef
                                                                                .cell,
                                                                            cell.getContext()
                                                                        )}
                                                                    </TableCell>
                                                                );
                                                            }
                                                        )}
                                                </TableRow>
                                            ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns?.length ?? 1}
                                                className="h-24 text-center">
                                                keine Ergebnisse.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                                {columns?.some((column) => column.footer) && (
                                    <TableFooter>
                                        {table
                                            .getFooterGroups()
                                            .map(
                                                (
                                                    footerGroup: HeaderGroup<any>
                                                ) => (
                                                    <TableRow
                                                        key={footerGroup.id}>
                                                        {footerGroup.headers.map(
                                                            (
                                                                header: ExtendedHeader<any>
                                                            ) => {
                                                                return (
                                                                    <TableHead
                                                                        key={
                                                                            header.id
                                                                        }
                                                                        className={cn(
                                                                            header
                                                                                .column
                                                                                .columnDef
                                                                                .isPinned ==
                                                                                'left' &&
                                                                                "sticky left-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm z-10 after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-zinc-200 dark:after:bg-zinc-800",
                                                                            header
                                                                                .column
                                                                                .columnDef
                                                                                .isPinned ==
                                                                                'right' &&
                                                                                "sticky right-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm z-10 after:content-[''] after:absolute after:top-0 after:left-0 after:h-full after:w-px after:bg-zinc-200 dark:after:bg-zinc-800"
                                                                        )}
                                                                        style={{
                                                                            width: `${header.getSize()}px !important`
                                                                        }}>
                                                                        {header.isPlaceholder
                                                                            ? null
                                                                            : flexRender(
                                                                                  header
                                                                                      .column
                                                                                      .columnDef
                                                                                      .footer,
                                                                                  header.getContext()
                                                                              )}
                                                                    </TableHead>
                                                                );
                                                            }
                                                        )}
                                                    </TableRow>
                                                )
                                            )}
                                    </TableFooter>
                                )}
                            </Table>
                        </div>
                        {pagination?.showPagination !== false && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <p className="text-sm font-medium">
                                        {t('pagination.entries-per-page')}
                                    </p>
                                    <Select
                                        value={`${table.getState().pagination.pageSize}`}
                                        onValueChange={(value: string) => {
                                            table.setPageSize(Number(value));
                                        }}>
                                        <SelectTrigger className="h-8 w-[70px] border-zinc-200 dark:border-zinc-700 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                            <SelectValue
                                                placeholder={
                                                    table.getState().pagination
                                                        .pageSize
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent side="top">
                                            {availablePageSizes.map(
                                                (pageSize) => (
                                                    <SelectItem
                                                        key={pageSize}
                                                        value={`${pageSize}`}>
                                                        {pageSize}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                                        {t('pagination.page')}{' '}
                                        {table.getState().pagination.pageIndex +
                                            1}{' '}
                                        {t('pagination.of')}{' '}
                                        {table.getPageCount()}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="icon-sm"
                                            className="hidden lg:flex"
                                            onClick={() =>
                                                table.setPageIndex(0)
                                            }
                                            disabled={
                                                !table.getCanPreviousPage()
                                            }>
                                            <span className="sr-only">
                                                {t('pagination.first-page')}
                                            </span>
                                            <ChevronFirst className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon-sm"
                                            onClick={() => table.previousPage()}
                                            disabled={
                                                !table.getCanPreviousPage()
                                            }>
                                            <span className="sr-only">
                                                {t('pagination.previous-page')}
                                            </span>
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon-sm"
                                            onClick={() => table.nextPage()}
                                            disabled={!table.getCanNextPage()}>
                                            <span className="sr-only">
                                                {t('pagination.next-page')}
                                            </span>
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon-sm"
                                            className="hidden lg:flex"
                                            onClick={() =>
                                                table.setPageIndex(
                                                    table.getPageCount() - 1
                                                )
                                            }
                                            disabled={!table.getCanNextPage()}>
                                            <span className="sr-only">
                                                {t('pagination.last-page')}
                                            </span>
                                            <ChevronLast className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
                {view != 'table' && children}
            </div>
        );
    }
);
Dataview.displayName = 'Dataview';

export interface DataviewListItemProps
    extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode | React.ReactNode[];
}

const DataviewListItem = React.forwardRef<
    HTMLDivElement,
    DataviewListItemProps
>(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn('flex flex-col gap-2', className)}
            {...props}>
            {children}
        </div>
    );
});

export {
    Dataview,
    DataviewContainer,
    DataviewHeader,
    DataviewListItem,
    dataviewVariants
};
