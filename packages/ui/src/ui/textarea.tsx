import * as React from 'react';

import { cn } from '@beluga/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                'placeholder:text-zinc-500 selection:bg-zinc-900 selection:text-zinc-50 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 flex field-sizing-content min-h-16 w-full min-w-0 rounded-md border px-3 py-2 text-base transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:placeholder:text-zinc-400 dark:selection:bg-zinc-50 dark:selection:text-zinc-900 focus-visible:border-zinc-950 focus-visible:ring-zinc-950/50 focus-visible:ring-[3px] dark:focus-visible:border-zinc-300 dark:focus-visible:ring-zinc-300/50 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 dark:aria-invalid:ring-red-900/20 dark:aria-invalid:border-red-900',
                className
            )}
            {...props}
        />
    );
}

export { Textarea };
