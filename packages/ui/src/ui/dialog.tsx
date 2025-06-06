'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';

import { cn } from '@beluga/utils';
import { Surface } from './surface';
import { Button } from './button';
import { Paragraph } from './paragraph';

const Dialog = ({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) => {
    return (
        <DialogPrimitive.Root
            data-slot="dialog"
            {...props}
        />
    );
};

const DialogTrigger = ({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) => {
    return (
        <DialogPrimitive.Trigger
            data-slot="dialog-trigger"
            {...props}
        />
    );
};

const DialogPortal = ({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) => {
    return (
        <DialogPrimitive.Portal
            data-slot="dialog-portal"
            {...props}
        />
    );
};

const DialogClose = ({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) => {
    return (
        <DialogPrimitive.Close
            data-slot="dialog-close"
            {...props}
        />
    );
};

const DialogOverlay = ({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) => {
    return (
        <DialogPrimitive.Overlay
            data-slot="dialog-overlay"
            className={cn(
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-zinc-50/80 backdrop-blur-sm dark:bg-zinc-950/80',
                className
            )}
            {...props}
        />
    );
};

interface DialogContentProps
    extends React.ComponentProps<typeof DialogPrimitive.Content> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const DialogContent = ({
    className,
    children,
    size = 'md',
    ...props
}: DialogContentProps) => {
    return (
        <DialogPortal data-slot="dialog-portal">
            <DialogOverlay />
            <DialogPrimitive.Content
                data-slot="dialog-content"
                asChild
                {...props}>
                <Surface
                    elevation="high"
                    className={cn(
                        'relative max-h-[calc(100vh-2rem)] overflow-y-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] bg-zinc-50 dark:bg-zinc-950 rounded-lg duration-200',
                        size === 'sm' && 'sm:max-w-sm',
                        size === 'md' && 'sm:max-w-lg',
                        size === 'lg' && 'sm:max-w-2xl',
                        size === 'xl' && 'sm:max-w-4xl',
                        className
                    )}>
                    {children}
                </Surface>
            </DialogPrimitive.Content>
        </DialogPortal>
    );
};

interface DialogHeaderProps extends React.ComponentProps<'div'> {
    sticky?: boolean;
    showClose?: boolean;
}

const DialogHeader = ({
    className,
    sticky = true,
    showClose = true,
    children,
    ...props
}: DialogHeaderProps) => {
    return (
        <div
            data-slot="dialog-header"
            className={cn(
                'w-full px-6 py-4',
                sticky &&
                    'sticky top-0 z-10 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-700',
                className
            )}
            {...props}>
            <div className="relative w-full flex flex-col gap-0.5 pr-10">
                {children}
                {showClose && (
                    <DialogPrimitive.Close asChild>
                        <Button
                            variant="ghost"
                            size="icon-xs"
                            className="absolute top-0 -right-2">
                            <XIcon />
                            <span className="sr-only">Close</span>
                        </Button>
                    </DialogPrimitive.Close>
                )}
            </div>
        </div>
    );
};

interface DialogBodyProps extends React.ComponentProps<'div'> {
    className?: string;
}

const DialogBody = ({ className, ...props }: DialogBodyProps) => {
    return (
        <div
            data-slot="dialog-body"
            className={cn('flex-1 p-6 flex flex-col gap-4', className)}
            {...props}
        />
    );
};

interface DialogFooterProps extends React.ComponentProps<'div'> {
    sticky?: boolean;
}

const DialogFooter = ({
    className,
    sticky = true,
    ...props
}: DialogFooterProps) => {
    return (
        <div
            data-slot="dialog-footer"
            className={cn(
                'flex gap-2 justify-between items-center px-6 py-4',
                sticky &&
                    'sticky bottom-0 z-10 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-sm border-t border-zinc-200 dark:border-zinc-700',
                className
            )}
            {...props}
        />
    );
};

const DialogTitle = ({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) => {
    return (
        <DialogPrimitive.Title asChild>
            <Paragraph
                data-slot="dialog-title"
                size="lg"
                weight="semibold"
                className={className}
                {...props}
            />
        </DialogPrimitive.Title>
    );
};

const DialogDescription = ({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) => {
    return (
        <DialogPrimitive.Description asChild>
            <Paragraph
                data-slot="dialog-description"
                variant="muted"
                size="xs"
                className={className}
                {...props}
            />
        </DialogPrimitive.Description>
    );
};

export {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogBody,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger
};
