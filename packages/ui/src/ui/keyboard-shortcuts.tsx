'use client';

import { useEffect, useState } from 'react';
import { cn } from '@beluga/utils';
import React from 'react';

type ShortcutKey =
    | 'mod'
    | 'alt'
    | 'shift'
    | 'ctrl'
    | 'enter'
    | 'esc'
    | 'backspace'
    | 'delete'
    | string;

export interface KeyboardShortcutProps
    extends React.HTMLAttributes<HTMLElement> {
    shortcut: string;
}

const getPlatformKey = (key: ShortcutKey, isMac: boolean): string => {
    switch (key.toLowerCase()) {
        case 'mod':
            return isMac ? '⌘' : 'Strg';
        case 'alt':
            return isMac ? '⌥' : 'Alt';
        case 'shift':
            return isMac ? '⇧' : 'Shift';
        case 'ctrl':
            return isMac ? '⌃' : 'Strg';
        case 'enter':
            return isMac ? '↵' : 'Enter';
        case 'esc':
            return isMac ? '⎋' : 'Esc';
        case 'backspace':
            return isMac ? '⌫' : 'Backspace';
        case 'delete':
            return isMac ? '⌦' : 'Entf';
        default:
            return key.toUpperCase();
    }
};

export const KeyboardShortcut = ({
    shortcut,
    className,
    ...props
}: KeyboardShortcutProps) => {
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        setIsMac(navigator.userAgent.toUpperCase().indexOf('MAC') >= 0);
    }, []);

    const keys = shortcut.toLowerCase().split('+');
    const formattedKeys = keys.map((key) => getPlatformKey(key, isMac));

    return (
        <kbd
            className={cn(
                'pointer-events-none inline-flex select-none items-stretch leadine-none p-0.5 gap-1 rounded-md bg-zinc-300 dark:bg-zinc-800',
                className
            )}
            {...props}>
            {formattedKeys.map((key, index) => (
                <React.Fragment key={index}>
                    <span className="flex items-center justify-center text-xs font-mono font-medium px-1.5 py-0.5 bg-zinc-50 shadow-sm rounded-sm dark:bg-zinc-950">
                        {key}
                    </span>
                    {index < formattedKeys.length - 1 && (
                        <span className="text-zinc-500 dark:text-zinc-400 font-bold">
                            +
                        </span>
                    )}
                </React.Fragment>
            ))}
        </kbd>
    );
};
